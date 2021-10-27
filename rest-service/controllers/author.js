module.exports.getAuthor = (req, res, next) => {
    console.log("Get Author Page")
    let exampleJson = [{
        "postID": "36131c25-c05f-4a58-9012-0d2e03b73a5b",
        "title": "title221",
        "username": "username122",
        "content": "asdf123",
        "postType": "post",
        "tags": [
            "ad",
            "f2",
            "33"
        ],
        "reaction": {
            "like": 3,
            "love": 1,
            "rocket": 2
        },
        "comments": [
            {
                "username": "as444dn",
                "message": "newl 124124added comment"
            },
            {
                "username": "5555",
                "message": "123"
            },
            {
                "username": "dummy_username",
                "message": "12dasd"
            }
        ]
    }, {
        "postID": "d1faf016-a31d-4e09-a9b7-6d4aa9d1050b",
        "title": "Wow",
        "content": "yasdf",
        "tags": [
            "1",
            "2",
            "3"
        ],
        "reaction": {
            "like": 1,
            "love": 1,
            "rocket": 0
        },
        "comments": [
            {
                "username": "dummy_username",
                "message": "Awesome!"
            }
        ]
    }, {
        "postID": "d1faf016-a31d-4e09-a9b7-6d4aa9d1050b",
        "title": "number 3",
        "content": "hello",
        "tags": [
            "1",
            "2",
            
        ],
        "reaction": {
            "like": 100,
            "love": 52,
            "rocket": 250
        },
        "comments": [
            {
                "username": "dummy_username",
                "message": "Awesome!",
                "username": "CoolDude",
                "message": "Wicked Bro",
            }
        ]
    } 
]
    res.status(200).json(exampleJson)
}

exports.getAuthoByAuthorID = (req, res, next) => {
    let authorID = req.params.authorID;
    let exampleJson = {
        "type": "author",
        // # ID of the Author
        "id": authorID,
        // # the home host of the author
        "host": "http://127.0.0.1:5454/",
        // # the display name of the author
        "displayName": "Lara Croft",
        // # url to the authors profile
        "url": "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
        // # HATEOS url for Github API
        "github": "http://github.com/laracroft",
        // # Image from a public domain
        "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
    }
    res.status(200).json(exampleJson)
}

exports.postUpdateAuthorProfile = (req, res, next) => {
    let authorID = req.params.authorID;
    res.status(200).send("success")
}