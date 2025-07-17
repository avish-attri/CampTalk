import PostModal from '../models/post.model.js'

const CreatePost = async (req, res, next) => {
    try {
        const { question, author } = req.body;
        console.log(question, author);
        const responseData = await PostModal.create({
            question,
            author,
        })
        res.send({
            success: true,
            responseData,
        })
    } catch (error) {
        console.error("Error :: createPost :: \n" + error)
    }
}

const getPosts = async (req, res, next) => {
    try {
        const responseData = await PostModal.find();
        res.send({
            success: true,
            responseData,
        })
    } catch (error) {
        console.error("Error :: createPost :: \n" + error)
    }
}

const getSinglePost = async (req, res, next) => {
    try {
        const { postID } = req.query;
        console.log(postID)
        const responseData = await PostModal.findById(postID);
        res.send({
            success: true,
            responseData,
        })
    } catch (error) {
        console.error("Error :: createPost :: \n" + error)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const { postID } = req.body;
        if(!postID) throw Error("Pleas Provide post id");
        const responseData = await PostModal.findByIdAndDelete(postID)
        res.send({
            success: true,
            responseData,
        })
    } catch (error) {
        console.error("Error :: createPost :: \n" + error)
    }
}

const updatePost = async (req, res, next) => {
    try {
        const { postID, question, author } = req.body;
        console.log(postID, question, author)
        // Check if the post has answers
        const post = await PostModal.findById(postID);
        if (post && post.answers && post.answers.length > 0) {
            return res.status(400).send({
                success: false,
                message: "Cannot update a question that already has answers."
            });
        }
        const responseData = await PostModal.findByIdAndUpdate(postID, {
            question,
            author,
        }, { new: true });
        res.send({
            success: true,
            responseData,
        })
    } catch (error) {
        console.error("Error :: createPost :: \n" + error)
    }
}

const addAnswer = async (req, res, next) => {
    try {
        const { postID, answer, author } = req.body;
        if (!postID || !answer || !author) throw Error("Please provide post id, answer, and author");
        const responseData = await PostModal.findByIdAndUpdate(
            postID,
            { $push: { answers: { text: answer, author } } },
            { new: true }
        );
        res.send({
            success: true,
            responseData,
        });
    } catch (error) {
        console.error("Error :: addAnswer :: \n" + error);
        res.status(500).send({ success: false, error: error.message });
    }
};

export {
    CreatePost,
    getPosts,
    getSinglePost,
    deletePost,
    updatePost,
    addAnswer,
}