const Admin = require('../Modèles/Admin')

exports.Create = async (req, res) => {
    try {
        await Admin.create(req.body);

        res.redirect('/Admins');
    } 
    catch (error) 
    {
        res.status(404).render('Error',{ message:error.message });
    }
};

exports.readAll = async (req, res) => {
    try {
        const admins = await Admin.find();

        res.render('Admins',{admins});
    }
    catch (error) 
    {
        res.status(404).render('Error',{ message:error.message });
    }
};

exports.readSingle = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);
        
        res.render('Admin',{admin});
    } 
    catch (error) 
    {
        res.status(404).render('Error',{ message:error.message });
    }
};

exports.Update = async (req, res) => {
    try {
        const { id } = req.params;
        await Admin.findByIdAndUpdate(id,req.body);
        res.redirect('/Admins');
      
    } 
    catch (error) {
        res.status(404).render('Error',{ message:error.message });
    }
};

exports.Delete = async (req, res) => {
    try {
        const { id } = req.params;
        await Admin.findByIdAndDelete(id,req.body);
        res.redirect('/Admins');
      
    } 
    catch (error) {
        res.status(404).render('Error',{ message:error.message });
    }
};