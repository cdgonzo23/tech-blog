const newPostFormHandler = async (event) => {
  event.preventDefault();
  
  const title = document.querySelector("#blogpost-title").value;
  console.log(title);
  const description = document.querySelector("#blogpost-description").value;
  console.log(description);

  if (title && description) {
      const response = await fetch('/api/post', {
          method: "POST",
          body: JSON.stringify({ title, description }),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          document.location.replace('/dashboard')    
        }
  } else {
      alert('failed to create post.');
  }
}

document.querySelector("#add-blogpost").addEventListener("submit", newPostFormHandler);