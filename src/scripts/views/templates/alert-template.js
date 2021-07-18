const successAlert = (message) => `
        <div class="alert success">
        <input type="checkbox" id="alert2"/>
        <label class="close" title="close" for="alert2">
        <i class="icon-remove"></i>
        </label>
        <p class="inner">
        ${message}.
        </p>
        </div>
`;

const failedAlert = (message) => `
        <div class="alert error">
            <input type="checkbox" id="alert1"/>
            <label class="close" title="close" for="alert1">
            <i class="icon-remove"></i>
            </label>
            <p class="inner">
            <strong>Upps!</strong>${message}!
            </p>
        </div>
    `;

export { successAlert, failedAlert };
