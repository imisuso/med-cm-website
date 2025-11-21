<script setup>
import {onMounted, ref, watch, onBeforeUnmount, computed} from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';

const props = defineProps({
    // รับค่าได้ทั้ง Object (Delta) หรือ String (เผื่อเป็น JSON String หรือ HTML เดิม)
    modelValue: {
        type: [Object, String],
        default: () => ({ ops: [] }),
    },
    // --- เพิ่ม Prop toolbar ---
    // รับค่าได้ทั้ง String (ชื่อ preset) หรือ Array (config เอง)
    toolbar: {
        type: [String, Array],
        default: 'standard', // ค่าเริ่มต้น
    },
    readOnly: {
        type: Boolean,
        default: false,
    }
});

const emit = defineEmits(['update:modelValue']);
const editorRef = ref(null);
const isUploading = ref(false); // State สำหรับควบคุม Loading
let quill = null;

// --- 1. กำหนด Presets ของ Toolbar ---
const toolbarPresets = {
    simple: [
        ['bold', 'italic', 'underline', 'strike'],
        ['link'],
        ['clean']
    ],
    standard: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
    ],
    full: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ align: [] }],
        ['link', 'image', 'video'],
        ['clean'],
    ]
};

// --- Computed เพื่อเลือก Config ที่ถูกต้อง ---
const toolbarConfig = computed(() => {
    // ถ้าส่งมาเป็น Array ให้ใช้เลย (Custom)
    if (Array.isArray(props.toolbar)) {
        return props.toolbar;
    }
    // ถ้าส่งมาเป็น String ให้ดึงจาก Presets (ถ้าไม่มีให้ใช้ standard)
    return toolbarPresets[props.toolbar] || toolbarPresets.standard;
});

// --- Computed เช็คว่ามีปุ่ม Image หรือไม่ ---
const canInsertImage = computed(() => {
    const config = toolbarConfig.value;

    // ฟังก์ชัน Recursion เพื่อค้นหาคำว่า 'image' ใน Array ซ้อน Array
    const hasImage = (arr) => {
        if (!Array.isArray(arr)) return arr === 'image';
        return arr.some(item => hasImage(item));
    };

    return hasImage(config);
});

// --- ฟังก์ชันแปลงข้อมูลเข้าสู่ Editor ---
const setContentToEditor = (content) => {
    if (!quill) return;

    try {
        // กรณี 1: เป็น Object และมี ops (เป็น Delta แท้ๆ)
        if (typeof content === 'object' && content !== null && content.ops) {
            quill.setContents(content);
        }
        // กรณี 2: เป็น String (อาจเป็น JSON String ของ Delta หรือ HTML)
        else if (typeof content === 'string') {
            try {
                const parsed = JSON.parse(content);
                if (parsed.ops) {
                    quill.setContents(parsed); // เป็น JSON Delta
                } else {
                    quill.root.innerHTML = content; // เป็น HTML (Fallback)
                }
            } catch (e) {
                quill.root.innerHTML = content; // Parse JSON ไม่ผ่าน ถือเป็น HTML
            }
        }
        // กรณีอื่นๆ: เคลียร์ค่า
        else {
            quill.setContents([]);
        }
    } catch (error) {
        console.error('Error setting quill content:', error);
    }
};

// --- Image Upload Logic (คงเดิม) ---
const uploadImageAndInsert = async (file) => {
    if (!/^image\//.test(file.type)) {
        alert('Only images are allowed');
        return;
    }
    isUploading.value = true;
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await axios.post('/uploading_file_api', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        const url = response.data.url;
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', url);
        quill.setSelection(range.index + 1);
    } catch (error) {
        console.error('Image upload failed:', error);
        alert('Failed to upload image.');
    } finally {
        isUploading.value = false;
    }
};

// --- Handlers (คงเดิม) ---
const selectLocalImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = () => { if (input.files[0]) uploadImageAndInsert(input.files[0]); };
};

const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // เช็คก่อนเลยว่าอนุญาตให้ใส่รูปไหม ถ้าไม่ ก็จบการทำงาน
    if (!canInsertImage.value) return;

    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
        const file = e.dataTransfer.files[0];

        // ตรวจสอบว่าเป็นรูปหรือไม่ก่อนจะพยายามหาตำแหน่ง Cursor
        if (!/^image\//.test(file.type)) return;

        const selection = document.getSelection();
        let range = null;

        // 1. ลองใช้มาตรฐานใหม่ (Standard - Firefox)
        if (document.caretPositionFromPoint) {
            const pos = document.caretPositionFromPoint(e.clientX, e.clientY);
            if (pos) {
                range = document.createRange();
                range.setStart(pos.offsetNode, pos.offset);
                range.collapse(true);
            }
        }
            // 2. Fallback ใช้แบบเก่า (WebKit - Chrome, Safari, Edge)
        // แม้จะขึ้นเตือน Deprecated ใน Console แต่จำเป็นต้องใช้เพื่อให้ทำงานได้ใน Chrome/Safari
        else if (document.caretRangeFromPoint) {
            range = document.caretRangeFromPoint(e.clientX, e.clientY);
        }

        // 3. Apply Range ถ้าหาตำแหน่งเจอ
        if (range && selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            // ถ้าหาตำแหน่งไม่ได้จริงๆ ให้ Focus ที่ Editor ปกติ (ต่อท้าย)
            quill.focus();
        }

        uploadImageAndInsert(file);
    }
};

const handlePaste = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    if (clipboardData && clipboardData.items) {
        for (let i = 0; i < clipboardData.items.length; i++) {
            const item = clipboardData.items[i];
            if (clipboardData.items[i].type.indexOf('image') !== -1) {
                // ถ้าเจอรูป แต่ Setting ห้ามใส่รูป
                if (!canInsertImage.value) {
                    // ป้องกัน default (เผื่อ browser พยายามแปะเป็น base64 หรือ icon ไฟล์)
                    e.preventDefault();
                    return;
                }

                e.preventDefault();
                uploadImageAndInsert(clipboardData.items[i].getAsFile());
                return;
            }
        }
    }
};

onMounted(() => {
    quill = new Quill(editorRef.value, {
        theme: 'snow',
        readOnly: props.readOnly, // ส่งค่า true/false ไปให้ Quill
        modules: {
            // ถ้า readOnly เป็น true ให้ปิด toolbar (ส่งค่า false/null)
            toolbar: props.readOnly ? false : {
                container: toolbarConfig.value,
                handlers: {
                    image: selectLocalImage
                },
            },
        },
    });

    // 1. Set ค่าเริ่มต้น
    if (props.modelValue) {
        setContentToEditor(props.modelValue);
    }

    // 2. Listen การเปลี่ยนแปลงเพื่อ Emit ค่า Delta ออกไป
    quill.on('text-change', (delta, oldDelta, source) => {
        // เราจะ emit เฉพาะเมื่อ user เป็นคนพิมพ์/แก้ไขเท่านั้น
        if (source === 'user') {
            // ส่งออกเป็น Object Delta
            emit('update:modelValue', quill.getContents());
        }
    });

    // สำคัญ: ถ้าเป็น Read-Only ไม่ควรดักจับ Event Drop/Paste เพื่ออัปโหลด
    if (!props.readOnly) {
        quill.root.addEventListener('drop', handleDrop, false);
        quill.root.addEventListener('paste', handlePaste, false);
    } else {
        // Bind Events
        quill.root.addEventListener('drop', handleDrop, false);
        quill.root.addEventListener('paste', handlePaste, false);
    }
});

onBeforeUnmount(() => {
    if (quill && quill.root) {
        quill.root.removeEventListener('drop', handleDrop);
        quill.root.removeEventListener('paste', handlePaste);
    }
});

// Watch for external changes
// หมายเหตุ: การ Watch Object อาจทำให้เกิด Loop ได้ถ้าระวังไม่ดี
// แต่สำหรับเคสทั่วไปที่ไม่ใช่ Realtime Collaboration โค้ดนี้เพียงพอ
watch(() => props.modelValue, (newValue) => {
    // ถ้าค่าใหม่เท่ากับค่าปัจจุบันใน Editor (เปรียบเทียบ JSON string) ไม่ต้องทำอะไร
    // เพื่อป้องกัน Cursor กระโดด หรือ Loop
    const currentContent = JSON.stringify(quill.getContents());
    const newContent = JSON.stringify(newValue);

    if (currentContent !== newContent) {
        setContentToEditor(newValue);
    }
}, { deep: true });
</script>

<template>
    <div class="relative flex flex-col group"
         :class="[ readOnly ? 'is-read-only' : 'bg-white rounded-md shadow-sm border border-gray-200' ]">

        <div v-if="isUploading && !readOnly"
             class="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-md cursor-wait">
        </div>

        <div ref="editorRef"
             class="overflow-y-auto"
             :class="[ readOnly ? 'h-auto' : 'h-64' ]"
             style="font-family: inherit;">
        </div>

        <div v-if="!readOnly" class="px-3 py-1 bg-gray-50 text-xs text-gray-500 border-t rounded-b-md">
            Tip: Drag & drop images or paste screenshots directly.
        </div>
    </div>
</template>

<style>
/* Style เดิม */
.ql-toolbar {
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
    border-color: #e5e7eb !important;
}
.ql-container {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-color: #e5e7eb !important;
    font-size: 1rem !important;
}
/* เพิ่ม CSS เพื่อลบ Border ของ Quill ในโหมด Read Only */
.read-only-editor .ql-container.ql-snow {
    border: none !important;
}

/* ปรับ Padding ให้ชิดขอบซ้ายขวามากขึ้นในโหมดอ่าน */
.read-only-editor .ql-editor {
    padding-left: 0 !important;
    padding-right: 0 !important;
    background-color: transparent;
}

/* 1. ลบเส้นขอบของ Container */
.is-read-only :deep(.ql-container.ql-snow) {
    border: none !important;
}

/* 2. ปรับ Padding ให้ชิดขอบ (เหมือนข้อความปกติ) */
.is-read-only :deep(.ql-editor) {
    padding: 0 !important;
    background-color: transparent;
}

/* 3. (เผื่อไว้) ซ่อน Toolbar ถ้ามันเผลอหลุดมา */
.is-read-only :deep(.ql-toolbar) {
    display: none !important;
}
</style>
