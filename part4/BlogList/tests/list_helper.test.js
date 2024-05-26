// tests/list_helper.test.js

const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      url: 'https://www.hawking.org.uk/a-brief-history-of-time',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fa',
      title: 'The Art of Computer Programming',
      author: 'Donald Knuth',
      url: 'https://www-cs-faculty.stanford.edu/~knuth/taocp.html',
      likes: 20,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has multiple blogs, equals the sum of likes', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 35)
  })

  test('when list is empty, equals zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
})

describe('favorite blog', () => {
  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      url: 'https://www.hawking.org.uk/a-brief-history-of-time',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fa',
      title: 'The Art of Computer Programming',
      author: 'Donald Knuth',
      url: 'https://www-cs-faculty.stanford.edu/~knuth/taocp.html',
      likes: 20,
      __v: 0
    }
  ]

  const favorite = {
    title: 'The Art of Computer Programming',
    author: 'Donald Knuth',
    likes: 20
  }

  test('when list has multiple blogs, finds the one with most likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    assert.deepStrictEqual(result, favorite)
  })

  test('when list is empty, returns null', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })
})

describe('most blogs', () => {
  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      url: 'https://www.hawking.org.uk/a-brief-history-of-time',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fa',
      title: 'The Art of Computer Programming',
      author: 'Donald Knuth',
      url: 'https://www-cs-faculty.stanford.edu/~knuth/taocp.html',
      likes: 20,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fb',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      url: 'https://www.oreilly.com/library/view/clean-code/9780136083238/',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fc',
      title: 'Refactoring',
      author: 'Martin Fowler',
      url: 'https://martinfowler.com/books/refactoring.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fd',
      title: 'Agile Software Development',
      author: 'Robert C. Martin',
      url: 'https://www.oreilly.com/library/view/agile-software-development/0135974445/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fe',
      title: 'The Mythical Man-Month',
      author: 'Frederick P. Brooks',
      url: 'https://en.wikipedia.org/wiki/The_Mythical_Man-Month',
      likes: 9,
      __v: 0
    }
  ];

  const mostProlificAuthor = {
    author: 'Robert C. Martin',
    blogs: 2
  };

  test('when list has multiple blogs, finds the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    assert.deepStrictEqual(result, mostProlificAuthor);
  });

  test('when list is empty, returns null', () => {
    const result = listHelper.mostBlogs([]);
    assert.strictEqual(result, null);
  });
});

describe('most likes', () => {
  test('when list is empty, returns null', () => {
    const blogs = [];
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, null);
  });

  test('when list has one blog, returns the author of that blog', () => {
    const blogs = [
      {
        title: 'Blog 1',
        author: 'Author 1',
        likes: 10,
      },
    ];
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, { author: 'Author 1', likes: 10 });
  });

  test('when list has multiple blogs, returns the author with most likes', () => {
    const blogs = [
      {
        title: 'Blog 1',
        author: 'Author 1',
        likes: 10,
      },
      {
        title: 'Blog 2',
        author: 'Author 2',
        likes: 20,
      },
      {
        title: 'Blog 3',
        author: 'Author 1',
        likes: 5,
      },
      {
        title: 'Blog 4',
        author: 'Author 3',
        likes: 15,
      },
      {
        title: 'Blog 5',
        author: 'Author 2',
        likes: 30,
      },
    ];
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, { author: 'Author 2', likes: 50 });
  });

  test('when there is a tie, returns one of the top authors', () => {
    const blogs = [
      {
        title: 'Blog 1',
        author: 'Author 1',
        likes: 10,
      },
      {
        title: 'Blog 2',
        author: 'Author 2',
        likes: 20,
      },
      {
        title: 'Blog 3',
        author: 'Author 1',
        likes: 20,
      },
      {
        title: 'Blog 4',
        author: 'Author 2',
        likes: 10,
      },
    ];
    const result = listHelper.mostLikes(blogs);
    const possibleResults = [
      { author: 'Author 1', likes: 30 },
      { author: 'Author 2', likes: 30 },
    ];
    assert(possibleResults.some((r) => assert.deepStrictEqual(result, r) === undefined));
  });
});
