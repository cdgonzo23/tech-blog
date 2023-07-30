const commentFormHandler = async (event) => {
    event.preventDefault();
    const commentDescription = document.querySelector('#comment');

    if(commentDescription) {
        
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);