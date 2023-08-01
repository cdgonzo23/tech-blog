const deletePost = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector("#update-title").value;
    console.log(title);
    const description = document.querySelector("#update-description").value;
    console.log(description);
    const id = document.querySelector('#update-blogpost').getAttribute("post-id")
    console.log(id)
  
    if (title && description) {
        const response = await fetch(`/api/post/${id}`, {
            method: "DELETE",
            body: JSON.stringify({ title, description }),
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            document.location.replace('/dashboard')    
          }
    } else {
        alert('failed to delete post.');
    }
  };
  
  document.querySelector("#delete-btn").addEventListener("click", deletePost);