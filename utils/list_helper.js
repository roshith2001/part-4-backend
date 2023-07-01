var _ = require('lodash')


const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 1 ? 
    blogs[0].likes : 
    blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.reduce((favBlog, currentBlog) => {
      if (currentBlog.likes > favBlog.likes) {
        return currentBlog;
      } else {
        return favBlog;
      }
    });
  };

  const mostBlogs = (blogs) => {
    const countBlogs = _.countBy(blogs, 'author')
    const topAuthor = _.maxBy(_.keys(countBlogs), ((author) => countBlogs[author]))
    const blogCount = countBlogs[topAuthor]

    return ({
      author: topAuthor,
      blogs: blogCount
    })
  }

  const mostLikes = (blogs) => {
    const authorLikes = {}

    blogs.forEach(blog => {
      const author = blog.author
      const like = blog.likes

      if(authorLikes[author]){
        authorLikes[author] += like
      }
      else{
        authorLikes[author] = like
      }
    })


    const topAuthor = _.maxBy(_.keys(authorLikes), (author) => authorLikes[author])
    const topLikes = authorLikes[topAuthor]

    const obj = {
      author: topAuthor,
      likes: topLikes
    }
    return (obj)
  }
  

module.exports = {
    dummy,
    totalLikes, 
    favouriteBlog,
    mostBlogs,
    mostLikes
}