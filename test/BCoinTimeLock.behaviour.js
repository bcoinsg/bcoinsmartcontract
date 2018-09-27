import assertRevert from '../helpers/assertRevert';
const BigNumber = web3.BigNumber;
const BCoin = artifacts.require('BCoin');
const BCoinTimeLock = artifacts.require('BCoinTimeLock');
const decimalFactor = new BigNumber(Math.pow(10, 18));
const timeTravel = require('../helpers/timeTravel')(web3);

contract('BCoinTimeLock', function ([owner, recipient]) {

  beforeEach(async function () {
    this.token = await BCoin.new();
    this.totalSupply = await this.token.totalSupply();
  });

  describe('timelock', function () {

    it('holds tokens', async function () {
      const timelock = await BCoinTimeLock.new(this.token.address, recipient, 1545955200);
      const ownerBalance = await this.token.balanceOf(owner);
      assert.equal(ownerBalance.toString(), this.totalSupply.toString());
      await this.token.transfer(timelock.address, 1000000 * decimalFactor);
      assert.equal(await this.token.balanceOf(timelock.address), 1000000 * decimalFactor);
    });

    it('reverts if timelock is not over', async function () {
      const timelock = await BCoinTimeLock.new(this.token.address, recipient, 1545955200);
      await this.token.transfer(timelock.address, 1000000 * decimalFactor);
      await assertRevert(timelock.release({from: recipient}));
    });

    it('transfers tokens if timelock has passed', async function () {
      const timelock = await BCoinTimeLock.new(this.token.address, recipient, 1545955200);
      await this.token.transfer(timelock.address, 1000000 * decimalFactor);
      await timeTravel(100 * 24 * 60 * 60);
      await timelock.release({from: recipient});
    });

    it('cannot be released twice', async function () {
      const timelock = await BCoinTimeLock.new(this.token.address, recipient, 1545955200);
      await this.token.transfer(timelock.address, 1000000 * decimalFactor);
      await timeTravel(100 * 24 * 60 * 60);
      await timelock.release();
      await assertRevert(timelock.release());
      const balance = await this.token.balanceOf(recipient);
      assert.equal(balance.toString(), (new BigNumber(1000000 * decimalFactor)).toString());
    });
  
  });
  
});
