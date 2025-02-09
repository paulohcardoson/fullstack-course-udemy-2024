const sendRequest = async (method, url, data) => {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  return response;
};

const addPostButtonsEvents = () => {
  const getPostElements = (post) => {
    const title = post.querySelector(".blog-post-title");
    const content = post.querySelector(".blog-post-content");

    const buttonsContainer = post.querySelector(".blog-post-actions");

    const enterEditModeButton = buttonsContainer.querySelector(
      ".edit-blog-post-button"
    );
    const cancelEditButton = buttonsContainer.querySelector(
      ".cancel-update-blog-post-button"
    );
    const updatePostButton = buttonsContainer.querySelector(
      ".update-blog-post-button"
    );
    const deletePostButton = buttonsContainer.querySelector(
      ".delete-blog-post-button"
    );

    return {
      title,
      content,
      buttonsContainer,
      enterEditModeButton,
      cancelEditButton,
      updatePostButton,
      deletePostButton,
    };
  };

  const blogPostElements = document.querySelectorAll(".blog-post");

  blogPostElements.forEach((postElement) => {
    const id = postElement.dataset.postId;
    const {
      title,
      content,
      buttonsContainer,
      enterEditModeButton,
      cancelEditButton,
      updatePostButton,
      deletePostButton,
    } = getPostElements(postElement);

    cancelEditButton.onclick = function exitPostEditMode() {
      buttonsContainer.dataset.editingPostState = false;

      title.setAttribute("contenteditable", "false");
      content.setAttribute("contenteditable", "false");
    };
    deletePostButton.onclick = function deletePost() {
      sendRequest("DELETE", `/posts/${id}`).then(() => {
        location.reload();
      });
    };
    enterEditModeButton.onclick = function enterEditmode() {
      buttonsContainer.dataset.editingPostState = true;

      title.setAttribute("contenteditable", "true");
      content.setAttribute("contenteditable", "true");
    };
    updatePostButton.onclick = function updatePost() {
      sendRequest("PUT", `/posts/${id}`, {
        title: title.textContent,
        content: content.textContent,
      }).then(() => {
        location.reload();
      });
    };
  });
};
const addFormEvents = () => {
  const postsForm = document.querySelector("form#posts-form");
  const toggleOpenFormButton = postsForm.querySelector(
    "button#toggle-open-form-button"
  );

  toggleOpenFormButton.onclick = () => {
    const state = postsForm.getAttribute("data-opened-state") === "true";

    postsForm.setAttribute("data-opened-state", !state);
  };

  postsForm.onsubmit = async function sendPost(event) {
    event.preventDefault();

    const data = new FormData(postsForm);
    const values = {};

    data.forEach((value, key) => (values[key] = value));

    try {
      await sendRequest("POST", "/posts/create", {
        title: values.title,
        content: values.content,
      });

      location.reload();
    } catch (e) {
      console.error(e);
      alert("Failed to create post");
    }
  };
};

addPostButtonsEvents();
addFormEvents();
