async function fetchData() {
  try {
    const [usersResponse, postsResponse] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/posts')
    ]);

    const users = await usersResponse.json();
    const posts = await postsResponse.json();

    displayUsersAndPosts(users, posts);
  } catch (error) {
    console.error("Error fetching users or posts:", error);
  }
}

function displayUsersAndPosts(users, posts) {
  const container = document.getElementById('user-posts-container');

  users.forEach(user => {
    // Create a div for each user
    const userContainer = document.createElement('div');
    userContainer.classList.add('user-container');

    userContainer.innerHTML = `
      <div class="user-header">${user.name}</div>
      <div class="user-details">Email: ${user.email}</div>
      <div class="user-details">Website: ${user.website}</div>
      <button id="toggle-posts-${user.id}">Show Posts</button>
      <div class="posts-container" id="posts-container-${user.id}"></div>
    `;

    const userPosts = posts.filter(post => post.userId === user.id);

    const postsContainer = userContainer.querySelector(`#posts-container-${user.id}`);

    userPosts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <div class="post-title">${post.title}</div>
        <p>${post.body}</p>
      `;
      postsContainer.appendChild(postElement);
    });


    const toggleButton = userContainer.querySelector(`#toggle-posts-${user.id}`);
    toggleButton.addEventListener('click', () => {
      const postsContainer = userContainer.querySelector(`#posts-container-${user.id}`);
      postsContainer.classList.toggle('show'); 
    });

    container.appendChild(userContainer);
  });
}

window.onload = fetchData;







