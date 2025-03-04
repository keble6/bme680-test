function doSettings () {
    i2cWrite(1, 1)
}
function i2cWrite3 (reg: number, val2: number, val1: number, val0: number) {
    pins.i2cWriteNumber(
    slaveaddress,
    reg,
    NumberFormat.Int8LE,
    true
    )
    pins.i2cWriteNumber(
    slaveaddress,
    val2,
    NumberFormat.Int8LE,
    true
    )
    pins.i2cWriteNumber(
    slaveaddress,
    val1,
    NumberFormat.Int8LE,
    true
    )
    pins.i2cWriteNumber(
    slaveaddress,
    val0,
    NumberFormat.Int8LE,
    false
    )
}
function i2cWrite (reg: number, val: number) {
    // Set up Rest reg to be written to
    pins.i2cWriteNumber(
    slaveaddress,
    reg,
    NumberFormat.Int8LE,
    true
    )
    // Write 0xB6 to the reset reg
    pins.i2cWriteNumber(
    slaveaddress,
    val,
    NumberFormat.Int8LE,
    false
    )
}
function i2cRead (reg: number) {
    // Set up reg to be written to
    pins.i2cWriteNumber(
    slaveaddress,
    reg,
    NumberFormat.Int8LE,
    true
    )
    return pins.i2cReadNumber(slaveaddress, NumberFormat.Int8LE, false)
}
function dec2hex (dec: number) {
    dec1 = dec
    result = ""
    chars = "0123456789ABCDEF"
    while (dec1 != 0) {
        hex2 = dec1 % 16
        result = "" + chars.charAt(hex2) + result
        dec1 = Math.floor(dec1 / 16)
    }
    return "0x" + result
}
let Id = 0
let hex2 = 0
let chars = ""
let result = ""
let dec1 = 0
let slaveaddress = 0
basic.clearScreen()
// Slave address 0x76 (if SDO=0)
slaveaddress = 118
// Reset register
let reg_reset = 224
// Id register
let reg_Id = 208
basic.forever(function () {
    i2cWrite(reg_reset, 182)
    Id = i2cRead(reg_Id)
    basic.showIcon(IconNames.Heart)
    serial.writeString("ID = ")
    serial.writeLine("" + (dec2hex(Id)))
    basic.pause(100)
    basic.clearScreen()
    basic.pause(1000)
})
