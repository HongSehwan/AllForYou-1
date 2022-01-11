const { contents, likes } = require("../../models");
const seqFn = require("sequelize-fn");

module.exports = async(req, res) => {
    try {
    const categoryFilter = req.query.category;
    const typeFilter = req.query.type;
    const categoryData = await contents.findAll({
        where: {
            category: categoryFilter
        }
    })  
    const typeData = categoryData.findAll({
            type: typeFilter
        })
    const likeFilterData = typeData.findAll({
            attributes: [
                "id",
                "title",
                "director",
                "year",
                "rating",
                "runtime",
                "summary",
                "genres",
                "image",
                "category",
                "detail",
                "link",
                "type",
                "createdAt",
                "updatedAt"
            ],
            include: [{ model: likes, attributes: ["content_id"] }],
            order:[{model: likes}, sequelize.fn('COUNT', sequelize.col('content_id')), ' DESC'],
        })
        const contentId = await filterData.data.map((el) => { return el.id; });
        const contentLike = await contentId.data.map(async (el) => {
            return await likes.findAll({
                where: { 
                    content_id: el 
                },
                attributes: [ "content_id" ],
                order:[{model: likes}, sequelize.fn('COUNT', sequelize.col('content_id')), ' DESC'],
            })
        })
        const contentData = {
            likeFilterData: likeFilterData,
            contentLike: contentLike
        }
            return res.status(200).json({data: contentData, message: "successfully viewed the data type individual page"})
    }
    catch(err) {
        return res.status(500).json({ data: null, message: "server error" })
    }
};