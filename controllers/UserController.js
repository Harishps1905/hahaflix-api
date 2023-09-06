import User from '../models/UserModel.js';

export const addToLikedMovies = async (req, res, next) => {
    try {
        const {email, data} = req.body;
        const user = await User.findOne({ email });
        if(user){
            const {likedMovies} = user;
            const movieAlreadyLiked = likedMovies.find(({id})=>(id === data.id));
            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user._id, {
                        likedMovies: [...user.likedMovies, data],
                    },
                    { new: true }
                );
            } else return res.json({msg: 'Movie already added to the liked list.'})
        } else await User.create({email, likedMovies: [data]});
        return res.json({msg: 'Movie added successfully'});
    } catch (error) {
        return res.json({ msg: "Error adding movies!!!" });
    }
}

export const getLikedMovies = async (req, res, next) => {
    try {
        const {email} = req.params;
        const user = await User.findOne({email});
        if (user){
            return res.json({msg: 'sucess', Movies: user.likedMovies});
        }else {
            return res.json({msg: 'user with given email does not exists'});
        }
    } catch (error) {
            return res.json({msg: 'Error getting movies!!!'});
    }
}

export const removeLikedMovies = async (req, res, next) => {
    try {
        const {email, movieId} = req.body;
        const user = await User.findOne({email});
        if (user){
            const {likedMovies} = user;
            const movieIndex = likedMovies.findIndex(({id}) => id === movieId);

            if (movieIndex === undefined) {
                return res.status(400).send({msg: 'Movie not found'});
            }
            likedMovies.splice(movieIndex, 1);

            await User.findByIdAndUpdate(
                user._id,
                {
                    likedMovies,
                },
                {new: true}
            );

            return res.status(200).json({msg: 'Movie deleted successfully', movies: likedMovies})
        
        }
    } catch (error) {
        console.log(error);
        return res.json({msg: 'Error deleting movie!!!'});
        
    }
}