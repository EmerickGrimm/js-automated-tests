import assert from 'assert';
import getRefundTicketPricePercent from '../getRefundTicketPricePercent.js';

describe('getRefundTicketPricePercent', function () {
  it('should return 100% refund if the concert was cancelled and rescheduled', function () {
    assert.strictEqual(getRefundTicketPricePercent(100, true, true), 100);
  });

  it('should return 100% refund if more than 10 days before the concert', function () {
    assert.strictEqual(getRefundTicketPricePercent(11 * 24, false, false), 100);
  });

  it('should return 50% refund if between 6 and 10 days before the concert', function () {
    assert.strictEqual(getRefundTicketPricePercent(8 * 24, false, false), 50);
  });

  it('should return 30% refund if between 3 and 6 days before the concert', function () {
    assert.strictEqual(getRefundTicketPricePercent(4 * 24, false, false), 30);
  });

  it('should return 0% refund if 72 hours or less before the concert', function () {
    assert.strictEqual(getRefundTicketPricePercent(72, false, false), 0);
  });

  it('should return 0% refund if hoursBeforeConcert is negative', function () {
    assert.strictEqual(getRefundTicketPricePercent(-1, false, false), 0);
  });

  it('should return 0% refund if hoursBeforeConcert is 0', function () {
    assert.strictEqual(getRefundTicketPricePercent(0, false, false), 0);
  });

  it('should return 100% refund if hoursBeforeConcert is more than 240 and concert was cancelled', function () {
    assert.strictEqual(getRefundTicketPricePercent(300, true, false), 100);
  });

  it('should return 0% refund if 3 hours or less before the concert and concert was not cancelled or rescheduled', function () {
    assert.strictEqual(getRefundTicketPricePercent(3, false, false), 0);
  });

  it('should return 0% refund if hoursBeforeConcert is 0 and concert was cancelled', function () {
    assert.strictEqual(getRefundTicketPricePercent(0, true, false), 0);
  });
});
