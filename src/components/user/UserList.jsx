import React from 'react'
import useAuth from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';
import avatar from '../../assets/img/user.png';

export const UserList = ({ users, getUsers, following, setFollowing, page, setPage, more, loading }) => {
  const { auth } = useAuth();

  const follow = async (userId) => {
    const request = await fetch(Global.url + "follow/save", {
      method: "POST",
      body: JSON.stringify({ followed: userId }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });
    const data = await request.json();
    setFollowing([...following, userId]);
  }

  const unfollow = async (userId) => {
    const request = await fetch(Global.url + "follow/unfollow/" + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });
    const data = await request.json();
    if (data.status === "success") {
      let filterFollowings = following.filter(followingUserId => userId !== followingUserId);
      setFollowing(filterFollowings);
    }
  }

  const nextPage = () => {
    let next = page + 1
    setPage(next);
    getUsers(next);
    console.log('->', page, users);
  }
  return (
    <>
      <div className="content__posts">
        {
          users.map(user => {
            return (
              <article className="posts__post" key={user._id}>
                <div className="post__container">
                  <div className="post__image-user">
                    <a href="#" className="post__image-link">
                      {user.image !== "default.png" && <img src={Global.url + "user/avatar/" + user.image} className="post__user-image" alt="Foto de perfil" />}
                      {user.image === "default.png" && <img src={avatar} className="post__user-image" alt="Foto de perfil" />}
                    </a>
                  </div>
                  <div className="post__body">
                    <div className="post__user-info">
                      <a href="#" className="user-info__name">{user.name} {user.surname}</a>
                      <span className="user-info__divider"> | </span>
                      <a href="#" className="user-info__create-date">{user.created_at}</a>
                    </div>
                    <h4 className="post__content">{user.bio}</h4>
                  </div>
                </div>
                {user._id !== auth._id &&
                  <div className="post__buttons">
                    {!following.includes(user._id) &&
                      <button className="post__button post__button--green"
                        onClick={() => follow(user._id)}>
                        Seguir
                      </button>
                    }

                    {following.includes(user._id) &&
                      <button className="post__button"
                        onClick={() => unfollow(user._id)}>
                        Dejar de seguir
                      </button>
                    }
                  </div>
                }
              </article>
            )
          })
        }
      </div>

      {loading ? <div>Cargando...</div> : ""}

      {more &&
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            Ver mas publicaciones
          </button>
        </div>
      }
    </>
  )
}