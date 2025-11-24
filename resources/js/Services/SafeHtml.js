import DOMPurify from 'dompurify';

const updateSanitizedHtml = (el, value) => {
    if (!value) {
        el.innerHTML = '';
        return;
    }

    const config = {
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['target', 'style', 'class', 'width', 'height', 'frameborder', 'allowfullscreen', 'data-align'],
        FORBID_TAGS: ['script'],
    };

    el.innerHTML = DOMPurify.sanitize(value, config);
};

export default {
    mounted(el, binding) {
        updateSanitizedHtml(el, binding.value);
    },
    updated(el, binding) {
        updateSanitizedHtml(el, binding.value);
    }
};
