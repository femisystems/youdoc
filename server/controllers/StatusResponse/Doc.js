// Status messages for doc actions
const doc = {
  POSTSUCCESS: {
    success: true,
    message: 'Document successfully created!'
  },
  PUTSUCCESS: {
    success: true,
    message: 'Document successfully updated!'
  },
  DELSUCCESS: {
    success: true,
    message: 'Document successfully removed!'
  },
  POSTFAIL: {
    success: false,
    message: 'Process failed! Unable to create Document.'
  },
  PUTFAIL: {
    success: false,
    message: 'Process failed! Unable to update Document.'
  },
  DELFAIL: {
    success: false,
    message: 'Process failed! Unable to remove Document.'
  },
  GETONEFAIL: {
    success: false,
    message: 'Process failed! Unable to retrieve document at this time.'
  },
  GETALLFAIL: {
    success: false,
    message: 'Process failed! Unable to retrieve documents at this time.'
  }
};

module.exports = doc;
