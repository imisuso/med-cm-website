import { usePage } from '@inertiajs/vue3';

export function useTrans() {
    const transDb = (model, field) => {
        if (!model) return '';

        // 1. ดึงภาษาปัจจุบัน
        const locale = usePage().props.locale || 'th';

        // ----------------------------------------------------
        // กรณีภาษาอังกฤษ (EN)
        // ----------------------------------------------------
        if (locale === 'en') {
            // พยายามหา field_en ก่อน
            if (model[`${field}_en`] && model[`${field}_en`] !== '') {
                return model[`${field}_en`];
            }
            // ถ้าไม่มี EN ให้ Fallback ไปใช้ Logic ภาษาไทยด้านล่าง
        }

        // ----------------------------------------------------
        // กรณีภาษาไทย (TH) หรือ Fallback
        // ----------------------------------------------------

        // A. *** สำคัญ: ต้องหาแบบมี _th ก่อนเป็นอันดับแรก *** // (เพราะ DB คุณคือ name_th, title_th)
        if (model[`${field}_th`]) {
            return model[`${field}_th`];
        }

        // B. ถ้าไม่มี _th ค่อยหาแบบไม่มี Suffix (เผื่อเป็นตารางใหม่)
        if (model[field]) {
            return model[field];
        }

        return '';
    };

    return { transDb };
}
