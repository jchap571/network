import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Post.js"
import { AppState } from "@/AppState.js"
import Pop from "@/utils/Pop.js"


class PostsService {




  async getAllPosts() {
    const response = await api.get('api/posts')
    logger.log('Got the posts!', response.data)
    const newPosts = response.data.posts.map(postPOJO => new Post(postPOJO))
    try {
      AppState.posts = newPosts

    }
    catch (error) {
      console.log(error)
      Pop.error(error);
    }

    AppState.page = response.data.page
    AppState.totalPages = response.data.totalPages


  }

  async getPostsByCreatorId(profileId) {
    const response = await api.get(`api/posts?creatorId=${profileId}`)
    logger.log('Got projects for the profile', response.data)

    const newPosts = response.data.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = newPosts
  }





  async createPost(postData) {
    const response = await api.post('api/posts', postData)
    logger.log('Creating a post!', response.data)
    const newPost = new Post(response.data)
    AppState.posts.push(newPost)
  }

  async deletePost(postId) {
    const response = await api.delete(`api/posts/${postId}`)
    logger.log('Deleting the post!', response.data)
    const postIndex = AppState.posts.findIndex(post => post.id == post.id)
    AppState.posts.splice(postIndex, 1)

  }



  async changePostsPage(pageNumber, postQuery) {
    const response = await api.get(`/api/posts?page=${pageNumber}`)
    const newPosts = response.data
    logger.log('CHANGED POSTS PAGE', response.data)

    AppState.posts = newPosts
    const newPostsPage = response.data.posts.map(postPOJO => new Post(postPOJO))

    AppState.posts = newPostsPage
    AppState.page = response.data.page
    AppState.totalPages = response.data.totalPages

  }



}


export const postsService = new PostsService()