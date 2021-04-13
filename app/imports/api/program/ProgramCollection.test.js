import {Meteor} from 'meteor/meteor'
import {resetDatabase} from 'meteor/xolvio:cleaner'
import fc from 'fast-check'
import {Programs} from './ProgramCollection'
import {expect} from 'chai'

if (Meteor.isServer) {
  // this.userId が必要になる. meteor-publication-collector を使えばいいのだが面倒
  describe.skip('ProgramCollection', function() {
    before(function() {
      resetDatabase()
    })

    after(function() {
      resetDatabase()
    })

    it('Can define and remove', function(done) {
      this.timeout(5000)
      fc.assert(
          fc.property(fc.string(), fc.jsonObject(), (title, structure) => {
            console.log({title, structure})
            const docId = Programs.define({title, structure})
            expect(Programs.isDefined(docId)).to.be.true
            Programs.remove(docId)
            expect(Programs.isDefined(docId)).to.be.false
          }),
      )
      done()
    })
  })

}
