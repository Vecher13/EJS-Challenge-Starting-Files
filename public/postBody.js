var posts = document.querySelectorAll(".postBody")
posts.forEach((post) => {
post.innerHTML = post.innerHTML.replace(/(<([^>]+)>)/gi, " ");
})