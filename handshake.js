function _0x41a358() {
    _0x429d02 = 0x0;
    _0x1fecb0 = false;
    if (!_0x2d326a(_0x4df177.player_id)) {
        _0x4df177.player_id = crypto.randomUUID();
    }
    _0x3f7851 = _0x4df177.player_id;
    _0x52df92 = _0x4df177.discord_data;
    if (!_0x52df92) {
        _0x52df92 = _0x8bd6ea('discord_data');
        if (_0x52df92) {
            _0x52df92 = decodeURIComponent(_0x52df92);
        }
        _0x58d47d('discord_data');
    }
    if (_0x52df92) {
        try {
            _0x52df92 = JSON.parse(decodeURIComponent(escape(atob(_0x52df92))));
            if (_0x2d326a(_0x52df92.accountId)) {
                _0x3f7851 = _0x52df92.accountId;
                _0x2e6fcb.setAttribute('stroke', _0x52df92.name);
                if (_0x52df92.avatar) {
                    _0x55065b.style.backgroundImage = 'url(' + _0x52df92.avatar + ')';
                }
                _0x4df177.discord_data = _0x52df92;
            } else {
                throw new Error('invalid uuid');
            }
        }
        catch (_0x3f9e79) {
            _0x52df92 = null;
            delete _0x4df177.discord_data;
            console.error('discord err:' + _0x3f9e79);
        }
    }
    let _0x617398 = _0x4df177.admin_pass || '';
    const idLength = _0x3f7851.length;
    const view = new DataView(new ArrayBuffer(0x3 + _0x342c9e));
    let offset = 0;
    
    view.setUint8(offset++, _0x5317f7.login);
    view.setUint16(offset, 0xed);
    
    offset += 0x2;
    for (let index = 0x0; index < _0x342c9e; index++) {
        view.setUint8(offset++, _0x3f7851.charCodeAt(idLength - index - 0x1) ^ 237);
    }
    
    if (_0x617398) {
        const _0x3e0da = _0x617398.length;
        for (let _0x5ffca6 = 0x0; _0x5ffca6 < _0x3e0da; _0x5ffca6++) {
            view.setUint8(offset++, _0x617398.charCodeAt(_0x3e0da - _0x5ffca6 - 0x1) ^ 237);
        }
    }
    const _0x2f2607 = _0x41e03c.getUint8(0x3 + 0xed % idLength);
    _0x202b5b(view);
    _0x429d02 = _0x2f2607;
}

function _0x202b5b(_0x12df7d) {
    if (_0x34b877 && _0x34b877.readyState === WebSocket.OPEN) {
        _0x5c3d88 += _0x12df7d.byteLength;
        if (_0x1fecb0) {
            const _0x444af1 = new Uint8Array(_0x12df7d.buffer);
            for (let _0x58864d = 0x0; _0x58864d < _0x444af1.length; _0x58864d++) {
                _0x444af1[_0x58864d] ^= _0x429d02;
            }
            const _0x2fe00e = 0xed % _0x444af1.length;
            const _0x10dac2 = _0x444af1[0x0];
            _0x444af1[0x0] = _0x444af1[_0x2fe00e];
            _0x444af1[_0x2fe00e] = _0x10dac2;
        }
        _0x34b877.send(_0x12df7d);
    }
}