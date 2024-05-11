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