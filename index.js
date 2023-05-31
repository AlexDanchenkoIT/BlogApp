let posts = [];

const maxLengthTitle = 100;
const maxLengthText = 200;

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts'); 
const notSetTitle = document.querySelector('.js-not-set-title');
const notSetText = document.querySelector('.js-not-set-text');
const counterTextarea = document.querySelector('.js-counter-textarea');
const counterInput = document.querySelector('.js-counter-input');
const limitExhaustedTitle = document.querySelector('.js-limit-exhausted-title');
const limitExhaustedTextarea = document.querySelector('.js-limit-exhausted-textarea');
const validationMessage = document.querySelector('.js-validation');

const dataPost = new Date();
const postDay = format(dataPost.getDate());
const postMonth = format(dataPost.getMonth() + 1);
const postYear = dataPost.getFullYear();
const postHours = format(dataPost.getHours());
const postMinutes = format(dataPost.getMinutes());

const titleNotSet = 'Отсутствует заголовок поста';
const textNotSet = 'Отсутствует тескт поста';
const validationTitleMsg = 'ТОВАРИЩ!!! Заголовок не должен превышать 100 символов';
const validationTextMsg = 'ТОВАРИЩ!!! Текст не должен превышать 200 символов';


newPostBtnNode.addEventListener('click', function(){
    const postFromUser = getPostFromUser();

    if (!postFromUser.title) {
        notSetTitle.classList.remove('not-set-post');
        return;

    } else {
        notSetTitle.classList.add('not-set-post');
    }

    if (!postFromUser.text) {
        notSetText.classList.remove('not-set-text');
        return;

    } else {
        notSetText.classList.add('not-set-text');
    }

    if ((postFromUser.title.length > maxLengthTitle) || (postFromUser.text.length > maxLengthText)) {
        return;
    }


    addPost (postFromUser);

    renderPost();

    clearInput();

    clearCounter();
})

const getPostFromUser = () => {
    const title = postTitleInputNode.value;
    const text = postTextInputNode.value;

    return {
        title,
        text,
    };
}

const addPost = (post) => {
    posts.push(post);
}

const getPosts = () => {
    return posts;
}

function format(n) {
    if (n < 10) {
        n = '0' + n   
    }
    return n;
}

function getDataPost() {
    let dataPost = `${postDay}.${postMonth}.${postYear} ${postHours}:${postMinutes}`
    return dataPost
}

const renderPost = () => {
    const posts = getPosts();
    const dataPost = getDataPost();
    let postsHTML = ``

    posts.forEach(post => {
        postsHTML += `
        <div class='post'>
            <p class='post__data'>${dataPost}</p>
            <p class='post__title'>${post.title}</p>
            <p class='post__text'>${post.text}</p>
        </div>`
    });


    postsNode.innerHTML = postsHTML;
}

const clearInput = () => {
    postTitleInputNode.value = '';
    postTextInputNode.value = '';
}

const clearCounter = () => {
    counterInput.innerText = 0;
    counterTextarea.innerText = 0;
}

const onInputTextarea = (evt) => {
    let length = evt.target.value.length;
    counterTextarea.innerText = length;

    if (length > maxLengthText) {
        limitExhaustedTextarea.classList.add('limit-exhausted');
    } else {
        limitExhaustedTextarea.classList.remove('limit-exhausted');
    }
    
}

const onInputTitle = (evt) => {
    let length = evt.target.value.length
    counterInput.innerText = length
    
    if (length > maxLengthTitle) {
        limitExhaustedTitle.classList.add('limit-exhausted');
    }   else {
        limitExhaustedTitle.classList.remove('limit-exhausted');
    }
}

function validation() {

    const titleLegth = postTitleInputNode.value.length;
    const textLegth = postTextInputNode.value.length;

    if (textLegth > maxLengthTitle) {
        validationMessage.innerText = validationTextMsg;
        validationMessage.classList.remove('validation-msg_hidden');
        return;
    }

    if (titleLegth > maxLengthTitle) {
        validationMessage.innerText = validationTitleMsg;
        validationMessage.classList.remove('validation-msg_hidden');
        return;
    }

    validationMessage.classList.add('validation-msg_hidden');

}

postTextInputNode.addEventListener('input', onInputTextarea);
postTitleInputNode.addEventListener('input', onInputTitle);
postTextInputNode.addEventListener('input', validation);
postTitleInputNode.addEventListener('input', validation);
