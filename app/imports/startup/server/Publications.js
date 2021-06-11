import {Meteor} from 'meteor/meteor'
import {Stuffs} from '../../api/stuff/StuffCollection'
import {Programs} from '../../api/program/ProgramCollection'
import {SessionSpecs} from '../../api/sessionSpec/SessionSpecCollection'
import {DraftTexts} from '../../api/draftText/DraftTextCollection'
import {SyncFusionDiagrams} from '../../api/syncfusionDiagram/SyncFusionDiagramCollection'

/** Publish all the collections you need. */
Stuffs.publish()
Programs.publish()
SessionSpecs.publish()
DraftTexts.publish()
SyncFusionDiagrams.publish()

/** Need this for the alanning:roles package */
Meteor.publish(null, function() {
  if (this.userId) {
    return Meteor.roleAssignment.find({'user._id': this.userId})
  }
  return this.ready()
})
