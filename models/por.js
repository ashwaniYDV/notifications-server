const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const porSchema = new Schema({
    club: {
        type: Schema.Types.ObjectId,
        ref: 'club',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    position: {
        type: String,
        required: true
    },
    access: {
        type: Array,
        default: []
    },
    description: {
        type: String
    },
    code: {
        type: Number,
        default: 0
    }
});


const Por = mongoose.model("por", porSchema);
module.exports = Por;

/**
 *  POR access guide
 *  0: view access
 *  1: edit club details,
 *  2: send notification,
 *  3: edit events,
 *  4: edit projects,
 *  5: send messages
 *  
 */

/**
 *   POR code guide
 * 
 *  case 10:    //
        f = new CoordinatorFragment();
        break;

    case 20:    //
        f = new SubCoordintorFragment();
        break;

    case 30:    //
        f = new SubCoordintorFragment();
        break;
    case 31:    //sub-coordinator
        f = new SubCoordintorFragment();
        break;
    case 32:    //sub-lead
        f = new SubCoordintorFragment();
        break;

    case 40:    //
        f = new CoordinatorFragment();
        break;
    case 41:    //coordinator
        f = new CoordinatorFragment();
        break;
    case 42:    //lead
        f = new CoordinatorFragment();
        break;

    case 50:    //overall-coordinator
        f = new CoordinatorFragment();
        break;

    case 60:    //
        f = new TechnicalSecretaryFragment();
        break;
    case 61:    //tech
        f = new TechnicalSecretaryFragment();
        break;
    case 62:    //cult
        f = new TechnicalSecretaryFragment();
        break;
    case 63:    //sports
        f = new TechnicalSecretaryFragment();
        break;
    case 64:    //welfare
        f = new MaintenanceSecretaryFragment();
        break;
    case 65:    //maintenance
        f = new MaintenanceSecretaryFragment();
        break;
    case 66:    //mess
        f = new MaintenanceSecretaryFragment();
        break;

    case 70:    //
        f = new TechnicalSecretaryFragment();
        break;
    case 71:    //gen-tech
        f = new TechnicalSecretaryFragment();
        break;
    case 72:    //gen-cult
        f = new TechnicalSecretaryFragment();
        break;
    case 73:    //gen-sports
        f = new TechnicalSecretaryFragment();
        break;

    case 80:    //vp-gymkhana
        f = new VPFragment();
        break;

    case 90:    //superuser
        f = new TechnicalSecretaryFragment();
        break;
* 
*/