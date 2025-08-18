export const getAddressPayload = (params) => {
    const { values, id } = params;
    const request = {
        fullname: values?.fullName,
        mobileno: values?.mobileNo,
        address_line1: values?.address1,
        address_line2: values?.address2,
        email: values?.email,
        city: values?.city,
        state: values?.state,
        pincode: values?.pincode,
        country: values?.country ?? 'India',
        is_default: values?.isDefualt
    }
    if (id) {
        request.id = id;
    };

    return request;
}