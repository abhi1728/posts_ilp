var posts = [
    { id: 1, post: "hello world" },
    { id: 2, post: "how are you" },
    { id: 3, post: "hello js" }
  ];
  
  const tableBody = document.getElementById("tableBody");
  
  // Function to add one row
  function addRow(item) {
    const row = document.createElement('tr');
  
    const tdId = document.createElement('td');
    tdId.textContent = item.id;
    row.appendChild(tdId);
  
    const tdPost = document.createElement('td');
    tdPost.textContent = item.post;
    row.appendChild(tdPost);
  
    const tdActions = document.createElement('td');
  
    // Update button
    const updateBtn = document.createElement('button');
    updateBtn.textContent = "Update";
    updateBtn.onclick = function () {
      const input = document.createElement('input');
      input.type = "text";
      input.value = item.post;
  
      const saveBtn = document.createElement('button');
      saveBtn.textContent = "Save";
  
      saveBtn.onclick = function () {
        const newText = input.value.trim();
        if (newText) {
          // 🔥 Ask confirmation before updating
          if (confirm("Are you sure you want to update this post?")) {
            item.post = newText;
            tdPost.textContent = item.post;
  
            // Switch back to Update + Delete
            tdActions.innerHTML = "";
            tdActions.appendChild(updateBtn);
            tdActions.appendChild(deleteBtn);
          } else {
            // If cancelled, restore original post
            tdPost.textContent = item.post;
            tdActions.innerHTML = "";
            tdActions.appendChild(updateBtn);
            tdActions.appendChild(deleteBtn);
          }
        }
      };
  
      tdPost.textContent = "";
      tdPost.appendChild(input);
  
      // Replace Update with Save, but keep Delete alive
      tdActions.innerHTML = "";
      tdActions.appendChild(saveBtn);
      tdActions.appendChild(deleteBtn); // 👈 keep delete button always!
    };
    tdActions.appendChild(updateBtn);
  
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      // 🔥 Ask confirmation before deleting
      if (confirm("Are you sure you want to delete this post?")) {
        const index = posts.findIndex(p => p.id == item.id);
        if (index > -1) {
          posts.splice(index, 1);
        }
        row.remove();
        if (posts.length === 0) {
          renderPosts();
        }
      }
    };
    tdActions.appendChild(deleteBtn);
  
    row.appendChild(tdActions);
    tableBody.appendChild(row);
  }
  
  // Function for Add button
  function addPost() {
    const inputId = document.getElementById("postId");
    const inputPost = document.getElementById("postInput");
  
    const newId = inputId.value.trim();
    const newPost = inputPost.value.trim();
  
    if (newId && newPost) {
      if (posts.some(p => p.id == newId)) {
        alert("ID already exists!");
        return;
      }
  
      const newItem = { id: newId, post: newPost };
      posts.push(newItem);
  
      // 🔥 Clear "Posts are cooking..." row if it's currently displayed
      if (tableBody.children.length === 1 && tableBody.children[0].children[0].colSpan === 3) {
        tableBody.innerHTML = "";
      }
  
      addRow(newItem);
  
      inputId.value = "";
      inputPost.value = "";
    }
  }
  
  function renderPosts() {
    tableBody.innerHTML = "";
  
    if (posts.length === 0) {
      const row = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 3; // span across ID, Post, and Actions columns
      td.textContent = "Posts are cooking...";
      td.style.textAlign = "center";
      row.appendChild(td);
      tableBody.appendChild(row);
      return;
    }
  
    posts.forEach(addRow);
  }
  
  // Initial load
  renderPosts();
  