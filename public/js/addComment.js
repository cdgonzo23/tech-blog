const commentFormHandler = async (event) => {
    event.preventDefault();
    const commentDescription = document.querySelector('#comment-description').value;
    console.log(commentDescription);
    const blogpostId = document.querySelector('#add-comment').getAttribute('post-id');
    console.log(blogpostId);

    if (commentDescription) {
        const response = await fetch(`/api/post/${blogpostId}`, {
            method: 'POST',
            body: JSON.stringify({ description: commentDescription, blogpost_id: blogpostId }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.ok) {
            location.reload();
        }
    };
};

document.querySelector('#add-comment').addEventListener('submit', commentFormHandler);