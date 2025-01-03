recipie:{
    recipie_ID:{
        author:"user_ID"
        title:"name"
        ingredients: [
            {
                name: "ingredient1",
                amount: "1 cup",
            },
            {
                name: "ingredient2",
                amount: "200 grams",
            },
            // Additional ingredient entries as needed
        ]
        directions:"the directions"
        image:"URl"
        tags:["vegan","pescetarian","christmas"]
        ratings: [
            {
                userId: "user1_ID",
                rating: 4.5,
            },
            {
                userId: "user2_ID",
                rating: 3.0,
            },
            
        ]
        averageRating: 3.75
        
        uploadDate:  firebase.firestore.FieldValue.serverTimestamp()
        preptime: 5//cook time in minuts
        cooktime:5

    }
}