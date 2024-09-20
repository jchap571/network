import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Post.js"
import { AppState } from "@/AppState.js"


class PostsService {


  async getAllPosts() {
    const response = await api.get('api/posts')
    logger.log('Got the posts!', response.data)
    const newPosts = response.data.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = newPosts

    AppState.page = response.data.page
    AppState.totalPages = response.data.totalPages


  }

  async getPostsByCreatorId(profileId) {
    const response = await api.get(`api/posts?creatorId=${profileId}`)
    logger.log('Got projects for the profile', response.data)

    const newPosts = response.data.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = newPosts
  }


  async changePostsPage(pageNumber) {
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