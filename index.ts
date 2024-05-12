/****
 * ==> 6-0 Intro The Powerful Aggregation Framework
 *
 *  Aggregation: Is a way of processing a large number of documents in a collection by means of passing them through different stages.
 * The stages is known as "PIPELINE"
 *
 * */

/***
 * 
 * 6-1 
 * $Match and $Project Aggregation Stage
 * 
 * db.test.aggregate(
    [
        // stage = 1
        { $match: { gender: "Male", age: { $lt: 30 } } },
        
        // stage 2 
        {$project: {name: 1, email: 1, age: 1}} // project should be used at the very last stage 
    ]
)
*/

/****
 * 6-2 
 * 
 * NOTE::: Focus on using less stage/ pipeline as it can slow down the execution time!
 * 
 * 
 * $AddFields , $Out , $Merge Aggregation Stage
 * 
 * 
 * db.test.aggregate(
    [
        // stage = 1
        { $match: { gender: "Male" } },

        // stage 2 
        { $addFields: { courseLevel: "Level 2", eduTech: "Programming Hero" } },

        // stage 3
        { $project: { gender: 1, courseLevel: 1, eduTech: 1, age: 1, skills: 1 } },
        
        // //stage 4
        // { $out: "courseStudnet"} //create new collection with the given new property 
        {$merge: { into: { db: "test", coll: "newData" } }} //update the present collection with the given new property 
    ]
)

*/

/***
 * 6-3 
 * 
 * $Group, $Sum Aggregation Stage = db.test.aggregate(
    [
        // stage 1 
        // { $group: { _id: "$gender", count: { $sum: 1 } } },
        { $group: { _id: "$address.country", count: { $sum: 1 } } }
    ]
), 

db.test.aggregate(
    [
        // stage 1 
        // { $group: { _id: "$gender", count: { $sum: 1 } } },
        // { $group: { _id: "$address.country", count: {$sum: 1}, countryPeopleName: { $push: "$name" } } }
        { $group: { 
            _id: "$address.country", 
            count: {$sum: 1}, 
            fullDoc: { $push: "$$ROOT" } } 
            
        }, // Root is to show all the documents
            // stage 2
        {
            $project: {
                "fullDoc.name": 1, "fullDoc.email":1, 
            }
        }
    ]
)
 ,


==>$Push Aggregation Stage = db.test.aggregate(
    [
        // stage 1 
        // { $group: { _id: "$gender", count: { $sum: 1 } } },
        { $group: { _id: "$address.country", count: {$sum: 1}, countryPeopleName: { $push: "$name" } } }
    ]
)

db.test.aggregate(
    [
        // stage 1 
        // { $group: { _id: "$gender", count: { $sum: 1 } } },
        // { $group: { _id: "$address.country", count: {$sum: 1}, countryPeopleName: { $push: "$name" } } }
        { $group: { _id: "$address.country", count: {$sum: 1}, countryPeopleName: { $push: "$$ROOT" } } } // Root is to show all the documents
    ]
)

*/

/***
 * 
 * 6-4 
 * Explore More About $Group & $Project
 * 
 * db.test.aggregate(
    [
        // stage 1 

        {
            $group: {
                _id: null,
                totalSalary: { $sum: "$salary" },
                maxSalary: { $max: "$salary" },
                minSalary: { $min: "$salary" },
                avgSalary: { $avg: "$salary" },
            }

        },

        // stage 2 
        {
            $project: {
                totalSalary: 1,
                maxSalary: 1,
                minSalary: 1,
                averageSalary: "$avgSalary", // Changing the name
                rangeBetweenMaxAndMin: {$subtract: ["$maxSalary", "$minSalary"]}
            }
        }

    ]
)
*/

/****
 * 6-5 Explore $Group With $Unwind Aggregation Stage
 * 
 * 
 * db.test.aggregate(
    [
        // stage 1
        { $unwind: "$friends" },
        // stage 2 
        { $group: { _id: "$friends", count: { $sum: 1 } } }
    ]
)


db.test.aggregate(
    [
        // stage 1
        {
            $unwind: "$interests"

        },

        // stage 2 
        {
            $group: { _id: "$age", commonInterest: { $push: "$interests" } }
        }

    ]
)

 * 





*/


/****
 * 6-6 $Bucket, $Sort, And $Limit Aggregation Stage
 * 
 * db.test.aggregate(
    [
        // stage 1
        {
            $bucket: {
                groupBy: "$age",
                boundaries: [20, 40, 60, 80],
                default: "higherBura",
                output: {
                    count: { $sum: 1 },
                    personName: { $push: "$name" }, // to see only name
                    // personDocuments: {$push: "$$ROOT"} // to see all the documents
                }
            }
        },

        // stage 2 
       {$sort: { count: 1 }}

    ]
)

*/


/****
 * 6-7 $Facet, Multiple Pipeline Aggregation Stage
 * 
 * db.test.aggregate(
    [
        {
            $facet: {
                // pipeine 1 
                "friendsCount": [
                    // sage 1 of pipeline 1
                    { $unwind: "$friends" },
                    // sage 2 of pipeline 1
                    { $group: { _id: "$friends", count: { $sum: 1 } } }
                ],

                // pipeline 2 
                "educationCount": [
                    // stage 1 of pipeline 2 
                    { $unwind: "$education" },
                    // stage 2 of pipeline 2 
                    { $group: { _id: "$education", count: { $sum: 1 } } }
                ],

                // pipeline 3 
                "skillsCount": [
                    // stage 1 pipeline 3 
                    { $unwind: "$skills" },
                    //  stage 2 of pipeline 3 
                    { $group: { _id: "$skills", count: { $sum: 1 } } }

                ]
            }
        }
    ]
)
*/