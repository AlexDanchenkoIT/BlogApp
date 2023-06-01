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
    const dataPost = new Date();

    return {
        dataPost,
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

const renderPost = () => {
    const posts = getPosts();
    let postsHTML = ``

    posts.forEach(post => {
        postsHTML += `
        <div class='post'>
            <p class='post__data'>${format(post.dataPost.getDate())}.${format(post.dataPost.getMonth() + 1)}.${post.dataPost.getFullYear()} ${format(post.dataPost.getHours())}:${format(post.dataPost.getMinutes())}
            </p>
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

    if (textLegth > maxLengthText) {
        validationMessage.innerText = validationTextMsg;
        validationMessage.classList.remove('validation-msg_hidden');
        newPostBtnNode.setAttribute('disabled', true)
        return;
    }

    if (titleLegth > maxLengthTitle) {
        validationMessage.innerText = validationTitleMsg;
        validationMessage.classList.remove('validation-msg_hidden');
        newPostBtnNode.setAttribute('disabled', true)
        return;
    }

    validationMessage.classList.add('validation-msg_hidden');
    newPostBtnNode.removeAttribute('disabled')

}

postTextInputNode.addEventListener('input', onInputTextarea);
postTitleInputNode.addEventListener('input', onInputTitle);
postTextInputNode.addEventListener('input', validation);
postTitleInputNode.addEventListener('input', validation);
