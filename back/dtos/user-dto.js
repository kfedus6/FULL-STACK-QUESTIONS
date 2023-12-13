module.exports = class UserDto {
    nickname;
    email;
    id;

    constructor(model) {
        this.nickName = model.nickname;
        this.email = model.email;
        this.id = model.id;
    }
}