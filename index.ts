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