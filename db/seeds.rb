Animal.destroy_all

Animal.create(
  name: "Max",
  image: "https://images.unsplash.com/photo-1625794084867-8ddd239946b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  breed: "Golden Retriever",
  hobbies: "Playing fetch",
  user_id: 1,
  likes: []
)

Animal.create(
  name: "Mittens",
  image: "https://images.unsplash.com/photo-1661803859870-39b7e38e3fc1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
  breed: "Domestic Shorthair",
  hobbies: "Scratching furniture",
  user_id: 1,
  likes: []
)
  Animal.create(
    name: "Charlie",
    image: "https://images.unsplash.com/photo-1600077029182-92ac8906f9a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    breed: "Corgi",
    hobbies: "Going on walks",
    likes: [],
    user_id: 1
  )
  
  Animal.create(
    name: "Whiskers",
    image: "https://images.unsplash.com/photo-1592652426689-4e4f12c4aef5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    breed: "Siamese",
    hobbies: "Sleeping in sunbeams",
    likes: [],
    user_id: 1
  )
  
  Animal.create(
    name: "Socks",
    image: "https://images.unsplash.com/photo-1502339231458-411886a664c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    breed: "Calico",
    hobbies: "Playing with toys",
    likes: [],
    user_id: 1
  )
  
  Animal.create(
    name: "Rocky",
    image: "https://images.unsplash.com/photo-1558619819-fc2fa628fe77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    breed: "German Shepherd",
    hobbies: "Playing with toys",
    likes: [],
    user_id: 1
  )
  
  Animal.create(
    name: "Tigger",
    image: "https://images.unsplash.com/photo-1496806195556-91bdded94209?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    breed: "Bengal",
    hobbies: "Hunting birds",
    likes: [],
    user_id: 1
  )
  
  Animal.create(
    name: "Bailey",
    image: "https://unsplash.com/photos/zc4MEZMdXhc",
    breed: "Siberian Husky",
    hobbies: "Running",
    likes: [],
    user_id: 1
  )
  
  Animal.create(
    name: "Simba",
    image: "https://images.unsplash.com/photo-1601321525554-751e0420d97e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80",
    breed: "Persian",
    hobbies: "Being pampered",
    likes: [],
    user_id: 1
  )
  
  Animal.create(
    name: "Molly",
    image: "https://images.unsplash.com/photo-1626435872788-31f0fe12442a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1118&q=80",
    breed: "Dalmatian",
    hobbies: "Playing with other dogs",
    likes: [],
    user_id: 1
  )
puts 'animals seeded'