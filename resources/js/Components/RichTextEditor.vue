<script setup>
import {onMounted, ref, watch, onBeforeUnmount, computed} from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';

import BlotFormatter from 'quill-blot-formatter';

// แยกตัวแปรออกมาจาก Library Object
// const BlotFormatter = BlotFormatterLib.default || BlotFormatterLib;
// const ResizeAction = BlotFormatterLib.ResizeAction;
// const DeleteAction = BlotFormatterLib.DeleteAction;

// [Debug] ลอง Log ดูครับ ถ้าแก้ไขถูก ต้องไม่ขึ้น undefined
// console.log('Actions Check:', { ResizeAction, DeleteAction });

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

const emit = defineEmits(['update:modelValue', 'update:html', 'image-added', 'image-removed']);
const editorRef = ref(null);
const isUploading = ref(false); // State สำหรับควบคุม Loading
let quill = null;

// ---Register เข้ากับ Quill ---
// ต้อง Register ก่อนเรียก new Quill()
// --- [แก้จุดที่ 1] เช็คก่อน Register เพื่อแก้ Warning ---
if (!Quill.imports['modules/blotFormatter']) {
    Quill.register('modules/blotFormatter', BlotFormatter);
}

// --- 1. กำหนด Presets ของ Toolbar ---
const toolbarPresets = {
    simple: [
        ['bold', 'italic', 'underline', 'strike'],
        ['link'],
        ['clean']
    ],
    standard: [
        [{ header: [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ align: [] }],
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

watch(() => props.readOnly, (val) => {
    if (quill) {
        // ถ้า readOnly = true -> quill.enable(false)
        // ถ้า readOnly = false -> quill.enable(true)
        quill.enable(!val);
    }
});

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
    formData.append('image_file', file);

    try {
        const response = await axios.post('/uploading_file_api', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        const url = response.data.url;
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', url, 'user');
        quill.setSelection(range.index + 1, 'user');

        // --- Emit event บอก parent ว่ามีรูปเพิ่มเข้ามา ---
        emit('image-added', url);
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

    if (props.readOnly) return;

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
    if (props.readOnly) return;

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

// --- Helper function ดึงรายการ URL รูปภาพทั้งหมดจาก Delta ---
const getImagesFromDelta = (delta) => {
    const images = [];
    if (delta && delta.ops) {
        delta.ops.forEach(op => {
            if (op.insert && typeof op.insert === 'object' && op.insert.image) {
                images.push(op.insert.image);
            }
        });
    }
    return images;
};

onMounted(() => {
    // 1. [เพิ่มส่วนนี้] ป้องกันกล่องซ้อน: ล้าง Element ให้สะอาดก่อนสร้างใหม่
    if (editorRef.value) {
        editorRef.value.innerHTML = '';
    }

    quill = new Quill(editorRef.value, {
        theme: 'snow',
        readOnly: props.readOnly, // ส่งค่า true/false ไปให้ Quill
        bounds: '#unique-editor-wrapper', // [เพิ่ม] บังคับให้ popup ต่างๆ อยู่ในกรอบ
        modules: {
            blotFormatter: {
                overlay: {
                    style: {
                        border: '2px solid #3b82f6', // กรอบสีฟ้า
                    }
                }
            },
            // --------------------------------

            // ถ้า readOnly เป็น true ให้ปิด toolbar (ส่งค่า false/null)
            toolbar: {
                container: toolbarConfig.value,
                handlers: {
                    image: selectLocalImage
                },
            }
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

            // 2. [เพิ่มใหม่] ส่ง HTML (สำหรับการแสดงผล / เก็บลง DB)
            // quill.root.innerHTML คือ HTML string ปัจจุบันใน Editor
            emit('update:html', quill.root.innerHTML);
        }

        // Logic ตรวจสอบการลบรูป (Check Image Removal)
        // ทำงานเฉพาะเมื่อ User เป็นคนลบ เพื่อป้องกันการ Loop หรือทำงานซ้ำซ้อนตอนโหลดข้อมูล
        if (source === 'user') {
            // ดึง List รูปเก่า (ก่อนแก้ไข)
            const oldImages = getImagesFromDelta(oldDelta);
            // ดึง List รูปปัจจุบัน (หลังแก้ไข)
            const currentImages = getImagesFromDelta(quill.getContents());

            // หาความต่าง: รูปที่มีใน oldImages แต่ไม่มีใน currentImages คือรูปที่ถูกลบ
            const removedImages = oldImages.filter(imgUrl => !currentImages.includes(imgUrl));

            removedImages.forEach(url => {
                // Emit event บอก parent ว่ารูปนี้ถูกลบออกจาก Editor แล้วนะ
                emit('image-removed', url);
            });
        }
    });

    // Bind Events
    quill.root.addEventListener('drop', handleDrop, false);
    quill.root.addEventListener('paste', handlePaste, false);

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
    <div id="unique-editor-wrapper"
         class="relative flex flex-col group bg-white"
         :class="{ 'is-readonly': readOnly }">

        <div v-if="isUploading && !readOnly"
             class="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-md cursor-wait">
            <span class="text-sm text-gray-500">Uploading...</span>
        </div>

        <div ref="editorRef"></div>

        <div v-if="!readOnly" class="editor-footer px-3 py-1 bg-gray-50 text-xs text-gray-500">
            Tip: Drag & drop images or paste screenshots directly.
        </div>
    </div>
</template>

<style>
/* ---------------------------------------------------------------
   GLOBAL CSS (Not Scoped) for Quill Overrides
   --------------------------------------------------------------- */

/* 1. WRAPPER: กรอบใหญ่สุด */
#unique-editor-wrapper {
    border: 1px solid #d1d5db; /* gray-300 */
    border-radius: 0.375rem;   /* rounded-md */
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

/* 2. EDITOR SIZE: กำหนดความสูงตรงนี้ */
#unique-editor-wrapper .ql-container {
    height: 16rem; /* h-64 */
    flex-grow: 1;
    font-family: inherit;
}

/* 3. TOOLBAR & FOOTER BORDERS */
#unique-editor-wrapper .ql-toolbar.ql-snow {
    border: none !important;
    border-bottom: 1px solid #e5e7eb !important;
    background-color: #f9fafb;
    z-index: 2;
}
#unique-editor-wrapper .editor-footer {
    border-top: 1px solid #e5e7eb;
    z-index: 2;
}
#unique-editor-wrapper .ql-container.ql-snow {
    border: none !important; /* ลบเส้นขอบ Container ทิ้ง */
}

/* 4. IMAGES & MEDIA */
#unique-editor-wrapper .ql-editor img {
    display: inline-block; /* สำคัญ: ต้อง inline-block ถึงจะจัดกลางได้ */
    max-width: 100%;
    height: auto;
    margin: 0.5rem 0;
    border-radius: 0.375rem;
}
#unique-editor-wrapper .ql-editor .ql-video {
    max-width: 100%;
    width: 100%;
    aspect-ratio: 16 / 9;
    height: auto;
}

/* 5. BLOT FORMATTER TWEAKS (ซ่อนแถบ Align ที่รูป) */
.blot-formatter__toolbar {
    display: none !important; /* ซ่อนแถบเครื่องมือบนรูป */
}

/* 6. FOCUS OUTLINE */
.ql-editor:focus {
    outline: none !important;
    box-shadow: none !important;
}

/* ---------------------------------------------------------------
   READ ONLY MODE
   --------------------------------------------------------------- */
#unique-editor-wrapper.is-readonly {
    border: none !important;
    background: transparent;
}
#unique-editor-wrapper.is-readonly .ql-toolbar {
    display: none !important;
}
#unique-editor-wrapper.is-readonly .ql-container {
    height: auto !important; /* ปรับสูงตามเนื้อหา */
}
#unique-editor-wrapper.is-readonly .ql-editor {
    padding: 0 !important;
}
</style>
