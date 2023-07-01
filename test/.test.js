const listHelper = require('../utils/list_helper')

test('dummy return one', () => {
    const blog = []

    const result = listHelper.dummy(blog)
    expect(result).toBe(1)
})

describe('Total Likes', () => {
    test('should equalt to total likes', () => {
        const blog = [
            {
              "title": "June 13",
              "author": "Roshith Krishna P",
              "url": "www.google.com",
              "likes": 4,
              "id": "649dc47babf23115bcc6c5f4"
            },
            {
              "title": "Harry Potter and the lost Charm",
              "author": "J.K. Rowling",
              "url": "www.harry.com",
              "likes": 144,
              "id": "649eaf016b5783a62e134c33"
            },
            {
              "title": "Where Stars met Sun",
              "author": "John Joseph",
              "url": "www.wsms.com",
              "likes": 52,
              "id": "649eafc26b5783a62e134c35"
            },
            {
              "title": "One Indian Girl",
              "author": "Amit Chauhan",
              "url": "www.oneindiangirl.com",
              "likes": 98,
              "id": "649eafe76b5783a62e134c37"
            }
          ]
        const result = listHelper.totalLikes(blog)
        expect(result).toBe(298)
    })
    
    test('should equals the likes of one blog when list has only one blog', () => {
        const blog = [
            {
              "title": "June 13",
              "author": "Roshith Krishna P",
              "url": "www.google.com",
              "likes": 4,
              "id": "649dc47babf23115bcc6c5f4"
            }
          ]
        const result = listHelper.totalLikes(blog)
        expect(result).toBe(blog[0].likes)
    })
})

describe('favourite blog', () => {
    test('Should have blog with most likes', () => {
        const blog = [
            {
              "title": "June 13",
              "author": "Roshith Krishna P",
              "url": "www.google.com",
              "likes": 4,
              "id": "649dc47babf23115bcc6c5f4"
            },
            {
              "title": "Harry Potter and the lost Charm",
              "author": "J.K. Rowling",
              "url": "www.harry.com",
              "likes": 144,
              "id": "649eaf016b5783a62e134c33"
            },
            {
              "title": "Where Stars met Sun",
              "author": "John Joseph",
              "url": "www.wsms.com",
              "likes": 52,
              "id": "649eafc26b5783a62e134c35"
            },
            {
              "title": "One Indian Girl",
              "author": "Amit Chauhan",
              "url": "www.oneindiangirl.com",
              "likes": 98,
              "id": "649eafe76b5783a62e134c37"
            }
          ]

          const expected = {
            "author": "J.K. Rowling",
            "id": "649eaf016b5783a62e134c33",
            "likes": 144,
            "title": "Harry Potter and the lost Charm",
            "url": "www.harry.com",
          }
          const result = listHelper.favouriteBlog(blog)
          expect(result).toEqual(expected)
    })
})

describe('Author with most blog', () => {
  test('Should have author with most blogs', () => {
      const blog = [
          {
            "title": "June 13",
            "author": "Roshith Krishna P",
            "url": "www.google.com",
            "likes": 4,
            "id": "649dc47babf23115bcc6c5f4"
          },
          {
            "title": "Harry Potter and the lost Charm",
            "author": "J.K. Rowling",
            "url": "www.harry.com",
            "likes": 144,
            "id": "649eaf016b5783a62e134c33"
          },
          {
            "title": "Where Stars met Sun",
            "author": "John Joseph",
            "url": "www.wsms.com",
            "likes": 52,
            "id": "649eafc26b5783a62e134c35"
          },
          {
            "title": "One Indian Girl",
            "author": "Amit Chauhan",
            "url": "www.oneindiangirl.com",
            "likes": 98,
            "id": "649eafe76b5783a62e134c37"
          },
          {
            "title": "Agnipurush",
            "author": "Roshith Krishna P",
            "url": "www.agnip.com",
            "likes": 8,
            "id": "649eafe76b5788a62e134c37"
          },
          {
            "title": "Bahubali2",
            "author": "Roshith Krishna P",
            "url": "www.bahubali.com",
            "likes": 898,
            "id": "649eaee76b5788a62e134c37"
          }
        ]

        const expected = {
          "author": "Roshith Krishna P",
          "blogs": 3
        }
        const result = listHelper.mostBlogs(blog)
        expect(result).toEqual(expected)
  })
})

describe('Author with most likes', () => {
  test('Should have author with most likes', () => {
      const blog = [
          {
            "title": "June 13",
            "author": "Roshith Krishna P",
            "url": "www.google.com",
            "likes": 4,
            "id": "649dc47babf23115bcc6c5f4"
          },
          {
            "title": "Harry Potter and the lost Charm",
            "author": "J.K. Rowling",
            "url": "www.harry.com",
            "likes": 144,
            "id": "649eaf016b5783a62e134c33"
          },
          {
            "title": "Where Stars met Sun",
            "author": "John Joseph",
            "url": "www.wsms.com",
            "likes": 52,
            "id": "649eafc26b5783a62e134c35"
          },
          {
            "title": "One Indian Girl",
            "author": "Amit Chauhan",
            "url": "www.oneindiangirl.com",
            "likes": 98,
            "id": "649eafe76b5783a62e134c37"
          },
          {
            "title": "Agnipurush",
            "author": "Roshith Krishna P",
            "url": "www.agnip.com",
            "likes": 8,
            "id": "649eafe76b5788a62e134c37"
          },
          {
            "title": "Bahubali2",
            "author": "Roshith Krishna P",
            "url": "www.bahubali.com",
            "likes": 898,
            "id": "649eaee76b5788a62e134c37"
          }
        ]

        const expected = {
          "author": "Roshith Krishna P",
          "likes": 910,
        }
        const result = listHelper.mostLikes(blog)
        expect(result).toEqual(expected)
  })
})