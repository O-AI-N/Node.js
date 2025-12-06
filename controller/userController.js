const User = require("../models/customerSchema");
var moment = require("moment");
// prettier-ignore
const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]

const user_index_get = (req, res) => {
  //result => array of objects
  User.find()
    .then((result) => res.render("index", { data: result, moment }))
    .catch((err) => console.error(err));
};

const user_add_get = (req, res) => {
  res.render("user/add", { countries });
};

const user_view_get = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { data: result, moment });
    })
    .catch((err) => console.error(err));
};

const user_edit_get = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { data: result, moment, countries });
    })
    .catch((err) => console.error(err));
};

const user_post = (req, res) => {
  User.create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.error(err));
};

const user_search_post = (req, res) => {
  const searchText = req.body.searchText.trim();
  User.find({ $or: [{ firstName: searchText }, { lastName: searchText }] })
    .then((result) => {
      // console.log(result);
      res.render("user/search", { data: result, moment });
    })
    .catch((err) => console.error(err));
};

const user_delete = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.error(err));
};

const user_put = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.error(err));
};

module.exports = {
  user_index_get,
  user_add_get,
  user_view_get,
  user_edit_get,
  user_post,
  user_search_post,
  user_delete,
  user_put,
};
