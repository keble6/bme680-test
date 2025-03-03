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
    // Set up Rest reg to be written to
    pins.i2cWriteNumber(
    slaveaddress,
    reg,
    NumberFormat.Int8LE,
    true
    )
    return pins.i2cReadNumber(slaveaddress, NumberFormat.Int8LE, false)
}
let Id = 0
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
    serial.writeNumber(Id)
    serial.writeLine("")
    basic.pause(100)
    basic.clearScreen()
    basic.pause(1000)
})
