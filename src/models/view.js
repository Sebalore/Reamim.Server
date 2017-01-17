// var mongoose = require('mongoose');

// // View Schema
// var ViewSchema = new mongoose.Schema({
//     id: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     activeLayer: String,
//     layers: [
//         {
//             visible: {
//                 type: Boolean,
//                 default: false
//             },
//             name: {
//                 type: String,
//                 required: true
//             },
//             entities: []
//         }
//     ],
//     center: {
//         x: Number,
//         y: Number
//     },
//     options: {
//         timeline: {
//             type: Boolean,
//             default: false
//         },
//         animation: {
//             type: Boolean,
//             default: false
//         },
//         fullscreenButton: {
//             type: Boolean,
//             default: false
//         },
//         homeButton: {
//             type: Boolean,
//             default: false
//         },
//         infoBox: {
//             type: Boolean,
//             default: false
//         },
//         navigationHelpButton: {
//             type: Boolean,
//             default: false
//         },
//         shadows: {
//             type: Boolean,
//             default: false
//         },
//         sceneModePicker: {
//             type: Boolean,
//             default: true
//         },
//         sceneMode: {
//             type: Number,
//             default: 3
//         },
//         selectionIndicator: {
//             type: Boolean,
//             default: false
//         },
//         baseCesiumViewPicker: {
//             type: Boolean,
//             default: false
//         },
//         geocoder: {
//             type: Boolean,
//             default: false
//         }
//     }
// }, {
//     collection: 'views',
//     id: false
// });

// module.exports = mongoose.model('ViewModel', ViewSchema);
