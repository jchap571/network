import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Post.js"
import { AppState } from "@/AppState.js"
import Pop from "@/utils/Pop.js"


class PostsService {

  async getAllPosts() {
    const response = await api.get('api/posts')
    logger.log('Got the posts!', response.data)
    this.handleResponseData(response.data)
    const newPosts = response.data.posts.map(postPOJO => new Post(postPOJO))
  }


  async searchPosts(postQuery) {
    const response = await api.get(`api/posts?query=${postQuery}`)
    AppState.postQuery = postQuery
    this.handleResponseData(response.data)
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
    AppState.posts.unshift(newPost)
  }


  async deletePost(postId) {
    const response = await api.delete(`api/posts/${postId}`)
    logger.log('Deleting the post!', response.data)
    const postIndex = AppState.posts.findIndex(post => post.id == postId)
    AppState.posts.splice(postIndex, 1)

  }
  async changePostsPage(pageNumber, postQuery) {
    const response = await api.get(`/api/posts?page=${pageNumber}`)
    logger.log('CHANGED POSTS PAGE', response.data)
    this.handleResponseData(response.data)
  }

  handleResponseData(responseData) {
    const newPosts = responseData.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = newPosts
    AppState.page = responseData.page
    AppState.totalPages = responseData.totalPages
  }


  async likePosts(postId) {
    const response = await api.post(`/api/posts/${postId}/like`)
    logger.log('liked the post!', postId)

  }



  clearPosts() {
    AppState.posts = []
    AppState.page = 0
    AppState.totalPages = 0
  }

  clearSearchQuery() {
    AppState.postQuery = ''
  }





















  // async searchPosts(postQuery) {
  //   const response = await api.get(`search/posts?query=${postQuery}`)
  //   logger.log('searching posts', response.data)
  //   AppState.postQuery = postQuery
  //   this.handleResponseData(response.data)
  // }



}


export const postsService = new PostsService()