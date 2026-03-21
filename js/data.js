// данные о категориях
const categories = [
    { id: 'previews', name: 'Превью для видео', folder: 'previews', count: 4, ratio: 'video' },
    { id: 'avatars', name: 'Аватарки', folder: 'avatars', count: 2, ratio: 'square' },

    // { id: 'vk', name: 'Оформление ВК', folder: 'vk', count: 0, ratio: 'square' },
    // { id: 'youtube', name: 'Оформление YouTube', folder: 'youtube', count: 0, ratio: 'square' },
    // { id: 'twitch', name: 'Оформление Twitch', folder: 'twitch', count: 0, ratio: 'square' },
    { id: 'telegram', name: 'Оформление Telegram', folder: 'telegram', count: 2, ratio: 'square' },
];

// генерация массива изображений
function getImagesForFolder(folder, count) {
    const images = [];
    for (let i = 1; i <= count; i++) {
        images.push({
            src: `images/${folder}/work-${i}.jpg`,
            alt: `${folder} work ${i}`
        });
    }
    return images;
}

// объект со всеми работами
const worksData = {};
categories.forEach(cat => {
    worksData[cat.id] = getImagesForFolder(cat.folder, cat.count);
});