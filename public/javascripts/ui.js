let isSidebarOpen = false;

function openSidebar() {
    document.getElementById("sidebar").style.transform = "translateX(0%)";
    isSidebarOpen = true;
}

function closeSidebar() {
    document.getElementById("sidebar").style.transform = "translateX(-100%)";
    isSidebarOpen = false;
}

document.getElementById("sidebar-btn").addEventListener("click", () => {
    if (isSidebarOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
})