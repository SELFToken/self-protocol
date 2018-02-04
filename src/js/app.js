App = {
    web3Provider: null,
    contracts: {},

    init: function () {

        return App.initWeb3();
    },

    initWeb3: function () {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function () {

        $.getJSON('SELFToken.json', function (data) {
            var SELFTokenArtifact = data;
            App.contracts.SELFToken = TruffleContract(SELFTokenArtifact);
            App.contracts.SELFToken.setProvider(App.web3Provider);

        });

        return App.bindEvents();
    },

    bindEvents: function () {
        //self-token operations.
        $(document).on('click', '.btn-holder', App.handleGetHolder);
        $(document).on('click', '.btn-step', App.handleGetStep);
        $(document).on('click', '.btn-timer', App.handleGetTimer);
        $(document).on('click', '.btn-timerStep', App.handleGetTimerStep);
        $(document).on('click', '.btn-counter', App.handleGetCounter);

        $(document).on('click', '.btn-remaining', App.handleGetTimeRemaining);
        $(document).on('click', '.btn-withdraw', App.handleWithdraw);

        //copyroght opertions.
        $(document).on('click', '.btn-queryCopyright', App.handleQueryCopyright);
        $(document).on('click', '.btn-getManager', App.handleGetManager);

        //transaction opertions.
        $(document).on('click', '.btn-send', App.handleTransaction);

    },

    handleGetHolder: function (event) {
        var index = parseInt($('#input-code').val());

        App.contracts.SELFToken.deployed().then(function (instance) {
            return instance.getLockedFundsHolder(index);
        }).then(function (holder) {
            alert('the holder is ' + holder);
        });
    },

    handleGetStep: function (event) {
        var index = parseInt($('#input-code').val());

        App.contracts.SELFToken.deployed().then(function (instance) {
            return instance.getLockedFundsStep(index);
        }).then(function (step) {
            alert('the step is ' + step);
        });
    },

    handleGetTimer: function (event) {
        var index = parseInt($('#input-code').val());

        App.contracts.SELFToken.deployed().then(function (instance) {
            return instance.getLockedFundsTimer(index);
        }).then(function (timer) {
            alert('the timer is ' + timer);
        });
    },

    handleGetTimerStep: function (event) {
        var index = parseInt($('#input-code').val());

        App.contracts.SELFToken.deployed().then(function (instance) {
            return instance.getLockedFundsTimeStep(index);
        }).then(function (holder) {
            alert('the timer step is ' + holder);
        });
    },

    handleGetTimeRemaining: function(event) {
        var index = parseInt($('#input-code').val());
        var self_instance;
        var timer = 0;

        App.contracts.SELFToken.deployed().then(function (instance) {
            self_instance = instance;
            return instance.getLockedFundsTimer(index);
        }).then(function (_timer) {
            timer = _timer;
            return self_instance.getLockedFundsTimeStep(index);
        }).then(function(timerStep){
            var now = Date.parse(new Date()) / 1000;
            var remaining = timerStep - (now - timer);
            alert("the remaining time is " + remaining);
        });
    },

    handleGetCounter: function (event) {
        var index = parseInt($('#input-code').val());

        App.contracts.SELFToken.deployed().then(function (instance) {
            return instance.getLockedFundsCounter(index);
        }).then(function (count) {
            alert('the counter is ' + count);
        });
    },

    handleWithdraw: function (event) {
        var index = parseInt($('#input-code').val());

        web3.eth.getAccounts(function (err, accounts) {
            if(err){
                console.log(err);
            }
            var account = accounts[0];

            App.contracts.SELFToken.deployed().then(function (instance) {
                return instance.withdrawLockedFunds(index, {from: account,gas: 100000});
            }).then(function (succee) {
                alert('withdraw opertion finished with ' + succee);
            }).catch(function(error){
                alert('withdraw opertion finished with error, make sure the locked funds is available.');
            });
        });
    },

    handleQueryCopyright: function (event) {
        var address = $('#input-from-address').val();
        var code = $('input-copyright').val();

        App.contracts.SELFToken.deployed().then(function (instance) {
            return instance.queryCopyright(address, code);
        }).then(function (copyright) {
            alert('the result of copyright is ' + copyright);
        });
    },

    handleGetManager: function (event) {
        App.contracts.SELFToken.deployed().then(function (instance) {
            return instance.getManager();
        }).then(function (manager) {
            alert('the manager is ' + manager);
        });
    },

    handleTransaction: function (event) {
        var address = $('#input-to-address').val();
        var amount = $('#input-amount').val();

        web3.eth.getAccounts(function (err, accounts) {
            if(err){
                console.log(err);
            }
            var account = accounts[0];
            App.contracts.SELFToken.deployed().then(function (instance) {
                return instance.transfer(address, amount,{from: account,gas: 100000});
            }).then(function (succee) {
                alert('transaction finished, please check your balance from wallet. code: ' + succee);
            });
        });
    },
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});

