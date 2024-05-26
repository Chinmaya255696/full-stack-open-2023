// utils/list_helper.js
const _ = require('lodash');

const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }
  
  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
  
    const favorite = blogs.reduce((favorite, blog) => {
      return blog.likes > favorite.likes ? blog : favorite
    }, blogs[0])
  
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
  }

  
  // const mostBlogs = (blogs) => {
  //   if (blogs.length === 0) {
  //     return null
  //   }
  
  //   const authorBlogs = _.countBy(blogs, 'author')
  //   const topAuthor = _.maxBy(_.keys(authorBlogs), (author) => authorBlogs[author])
  
  //   return {
  //     author: topAuthor,
  //     blogs: authorBlogs[topAuthor]
  //   }
  // }

  const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return null;
    }
  
    const authorBlogsCount = blogs.reduce((authors, blog) => {
      authors[blog.author] = (authors[blog.author] || 0) + 1;
      return authors;
    }, {});
  
    const topAuthor = Object.keys(authorBlogsCount).reduce((a, b) => authorBlogsCount[a] > authorBlogsCount[b] ? a : b);
  
    return {
      author: topAuthor,
      blogs: authorBlogsCount[topAuthor]
    };
  };

  const mostLikes = (blogs) => {
    if (blogs.length === 0) {
      return null;
    }
    // Use reduce to create an object with authors and their total likes
    const likesByAuthor = blogs.reduce((acc, blog) => {
      if (!acc[blog.author]) {
        acc[blog.author] = blog.likes;
      } else {
        acc[blog.author] += blog.likes;
      }
      return acc;
    }, {});
  
    // Find the author with the most likes
    let topAuthor = null;
    let maxLikes = 0;
  
    for (const author in likesByAuthor) {
      if (likesByAuthor[author] > maxLikes) {
        topAuthor = author;
        maxLikes = likesByAuthor[author];
      }
    }
  
    return {
      author: topAuthor,
      likes: maxLikes,
    };
  };
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }
  