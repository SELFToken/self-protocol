pragma solidity ^0.4.18;

import "./BaseToken.sol";
import "./Copyright.sol";

contract SELFToken is BaseToken, Copyright {

    struct LockedFund {
        address holder;
        uint step;
        uint counter;
        uint timer;
        uint timerStep;
    }

    //foundation account.
    address account1 = 0x426aAD46f8cfFC71D718a96EB3eD976bFF3F5378;
    address account2 = 0x41113508125B5EFf4847743b6fA4A6bcC53A6064;

    //other account.
    address account3 = 0x3CF5388bD64A1914CFFC4fB07eE111A84D8355FA;
    address account4 = 0xf640Ed26566054CC97c1Ecd097B5D91fBaa1dE95;
    address account5 = 0xbAb822450b4f98353c7Dc931Cd74cB1beCd28fc5;
    address account6 = 0x46a2035A9EF77eD0A44a8F372EbbE09c75547345;

    address account7 = 0x6aD98FA3c24996f2AB6436361D816516172080a8;
    address account8 = 0x63996af1d882c79A6758Bc2766Ed4E2c315Ebffb;
    address account9 = 0x3A40d96F304888dE11179239C63e8B6fdaff4572;
    address account10 = 0x627306090abaB3A6e1400e9345bC60c78a8BEf57;

    uint256 public lockedFund;
    LockedFund[9] lockedFunds;

    uint month = 30 days;
    
    function SELFToken() public {
        name = "SelfMediaToken";
        symbol = "SELF";
        decimals = 8;

        uint256 hundredMillion = 10 ** (8 + decimals);
        uint256 million = 10 ** (6 + decimals);

        totalSupply = 100 * hundredMillion;
        lockedFund = 50 * hundredMillion;

        balances[account1] = 40 * hundredMillion;
        balances[account2] = 10 * hundredMillion;

        lockedFunds[0] = LockedFund({holder: account2,step: 5 * hundredMillion,counter: 20,timer: now,timerStep: 1 years});

        lockedFunds[1] = LockedFund({holder: account3,step: 64 * million,counter: 15,timer: now,timerStep: month});

        lockedFunds[2] = LockedFund({holder: account4,step: 48 * million,counter: 15,timer: now,timerStep: month});

        lockedFunds[3] = LockedFund({holder: account5,step: 56 * million,counter: 15,timer: now,timerStep: month});

        lockedFunds[4] = LockedFund({holder: account6,step: 32 * million,counter: 15,timer: now,timerStep: month});

        lockedFunds[5] = LockedFund({holder: account7,step: 32 * million,counter: 20,timer: now,timerStep: month});

        lockedFunds[6] = LockedFund({holder: account8,step: 24 * million,counter: 20,timer: now,timerStep: month});

        lockedFunds[7] = LockedFund({holder: account9,step: 28 * million,counter: 20,timer: now,timerStep: month});

        lockedFunds[8] = LockedFund({holder: account10,step: 16 * million,counter: 20,timer: now,timerStep: month});
    }

    function getLockedFund() public view returns (uint256 balance) {
        return lockedFund;
    }

    function withdrawLockedFunds(uint index) public returns (bool success) {

        require(index < 9);

        LockedFund storage _lockedFund = lockedFunds[index];

        uint timeElapsed = now - _lockedFund.timer;

        require (timeElapsed >= _lockedFund.timerStep && _lockedFund.counter > 0);

        uint count = timeElapsed / _lockedFund.timerStep;

        if (count > _lockedFund.counter) {
            count = _lockedFund.counter;
        }

        uint fund = count * _lockedFund.step;

        _lockedFund.timer += count * _lockedFund.timerStep;

        _lockedFund.counter -= count;

        balances[_lockedFund.holder] += fund;

        if (index == 0) {
            totalSupply += fund;
        } else {
            lockedFund -= fund;
        }
        
        return true;
    }

    function getLockedFundsHolder(uint index) public view returns (address holder) {
        require(index < 9);
        return lockedFunds[index].holder;
    }

    function getLockedFundsStep(uint index) public view returns (uint step) {
        require(index < 9);
        return lockedFunds[index].step;
    }

    function getLockedFundsTimer(uint index) public view returns (uint timer) {
        require(index < 9);
        return lockedFunds[index].timer;
    }

    function getLockedFundsTimeStep(uint index) public view returns (uint timerStep) {
        require(index < 9);
        return lockedFunds[index].timerStep;
    }

    function getLockedFundsCounter(uint index) public view returns (uint counter) {
        require(index < 9);
        return lockedFunds[index].counter;
    }
}