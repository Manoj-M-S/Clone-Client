import M from "materialize-css";
import { API } from "../backend";
import { isAuthenticated } from "../helper/AuthHelper";
const { user, token } = isAuthenticated();

export const CreateaPost = (
  photo,
  postedBy,
  API,
  user,
  token,
  title,
  body,
  userId
) => {
  fetch(`${API}/create/post/${user._id}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body,
      photo,
      postedBy,
      userId,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (!data.error) {
        M.toast({
          html: "Post Created Successful",
          classes: "#43a047 green darken-1",
        });
      } else {
        M.toast({
          html: data.error,
          classes: "#c62828 red darken-2",
        });
      }
    })
    .catch((error) => console.log(error));
};

export const updateProfilePic = (photo) => {
  fetch(`${API}/profile/pic/${user._id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      photo: photo,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

// export const Update = (title, body, photo, token, postId) => {
//   fetch(`${API}/post/update/${postId}`, {
//     method: "put",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       photo: photo,
//       title: title,
//       body: body,
//       postId: postId,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (!data.error) {
//         M.toast({
//           html: "Post Updated Successful",
//           classes: "#43a047 green darken-1",
//         });
//         setTimeout(() => {
//           window.location.href = `/editpost/${postId}`;
//         }, 2000);
//       } else {
//         M.toast({
//           html: data.error,
//           classes: "#c62828 red darken-2",
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
