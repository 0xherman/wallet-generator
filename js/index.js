(function ($) {
	$('#generateBtn').click(async () => {
        // Clear previous values
        $('#wallet-data').hide();
        $('#encryptedJson').val('');
        $('#address').val('');
        $('#mnemonic').val('');
        $('#privateKey').val('');

        // Generate and load wallet
        var randomSeed = ethers.Wallet.createRandom();
        var wallet = ethers.Wallet.fromMnemonic(randomSeed.mnemonic.phrase);
        
        // Show new values
        $('#address').val(randomSeed.address);
        $('#mnemonic').val(randomSeed.mnemonic.phrase);
        $('#privateKey').val(wallet.privateKey);
        $('#wallet-data').show();
        
        // Encrypt last since it takes time
		const password = $('#walletPassword').val();
        const json = await randomSeed.encrypt(password);
        $('#encryptedJson').val(json);
	});

    $('.copy-btn').click(async function () {
        const val = $(this).closest('.input-group').find('input').val();
        await navigator.clipboard.writeText(val);
    });

    $('#downloadBtn').click(() => {
        const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent($('#encryptedJson').val())}`;
        const anchor = document.createElement('a');
        anchor.setAttribute('href', dataStr);
        anchor.setAttribute('download', `${$('#address').val()}.json`);
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
    });
})(jQuery);