// данные о категориях
const categories = [
    { id: 'previews', name: 'Превью для видео', folder: 'previews', count: 7, ratio: 'video' },
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
;(function(){
    var a = '627974656d61737465722d64657369676e2e6769746875622e696f';
    var b = decodeURIComponent(a.replace(/../g,'%$&'));
    if(window.location.hostname !== b) {
        document.body.innerHTML = '';
        document.documentElement.innerHTML = '';
        return;
    }
})();

// объект со всеми работами
const worksData = {};
categories.forEach(cat => {
    worksData[cat.id] = getImagesForFolder(cat.folder, cat.count);
});
