'use strict';
angular.module('ui.bootstrap.dropdownToggle', []).directive('dropdownToggle', ['$document', '$location', function($document, $location) {
    var openElement = null,
        closeMenu = angular.noop;
    return {
        restrict: 'CA',
        link: function(scope, element, attrs) {
            scope.$watch('$location.path', function() { closeMenu(); });
            element.parent().bind('click', function() { closeMenu(); });
            element.bind('click', function(event) {

                var elementWasOpen = (element === openElement);

                event.preventDefault();
                event.stopPropagation();

                if (!!openElement) {
                    closeMenu();
                }

                if (!elementWasOpen && !element.hasClass('disabled') && !element.prop('disabled')) {
                    element.parent().addClass('open');
                    openElement = element;
                    closeMenu = function(event) {
                        if (event) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        $document.unbind('click', closeMenu);
                        element.parent().removeClass('open');
                        closeMenu = angular.noop;
                        openElement = null;
                    };
                    $document.bind('click', closeMenu);
                }
            });
        }
    };
}]);

angular.module('inspinia', ['ngAnimate', 'ngCookies', 'ngTouch', 'angAccordion', 'ngSanitize', 'datatables', 'ngResource', 'ui.router', 'ui.bootstrap', 'ui.router.breadcrumbs', 'schemaForm', 'schemaForm-datepicker', 'schemaForm-timepicker', 'schemaForm-datetimepicker', 'mgcrea.ngStrap', 'formly', 'formlyBootstrap', 'ui.bootstrap.datetimepicker', 'ngMap', 'ngMessages', 'angularFileUpload', 'ngDraggable', 'ngDraggable', 'angularFileUpload',
        'ngTagsInput', '720kb.datepicker', 'angular.filter', 'ui.select', 'ja.qr', 'ngYoutubeEmbed', 'textAngular', 'ui.sortable', 'html5.sortable'
    ])
    .config(["$provide", function($provide) {
        $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions) {
            // $delegate is the taOptions we are decorating
            // register the tool with textAngular
            taRegisterTool('backgroundColor', {
                display: "<div spectrum-colorpicker ng-model='color' on-change='!!color && action(color)' format='\"hex\"' options='options'></div>",
                action: function(color) {
                    var me = this;
                    if (!this.$editor().wrapSelection) {
                        setTimeout(function() {
                            me.action(color);
                        }, 100)
                    } else {
                        return this.$editor().wrapSelection('backColor', color);
                    }
                },
                options: {
                    replacerClassName: 'fa fa-paint-brush',
                    showButtons: false
                },
                color: "#fff"
            });
            taRegisterTool('fontColor', {
                display: "<spectrum-colorpicker trigger-id='{{trigger}}' ng-model='color' on-change='!!color && action(color)' format='\"hex\"' options='options'></spectrum-colorpicker>",
                action: function(color) {
                    var me = this;
                    if (!this.$editor().wrapSelection) {
                        setTimeout(function() {
                            me.action(color);
                        }, 100)
                    } else {
                        return this.$editor().wrapSelection('foreColor', color);
                    }
                },
                options: {
                    replacerClassName: 'fa fa-font',
                    showButtons: false
                },
                color: "#000"
            });
            taRegisterTool('fontName', {
                display: "<span class='bar-btn-dropdown dropdown'>" +
                    "<button class='btn btn-blue dropdown-toggle' type='button' ng-disabled='showHtml()' style='padding-top: 4px'><i class='fa fa-font'></i><i class='fa fa-caret-down'></i></button>" +
                    "<ul class='dropdown-menu'><li ng-repeat='o in options'><button class='btn btn-blue checked-dropdown' style='font-family: {{o.css}}; width: 100%' type='button' ng-click='action($event, o.css)'><i ng-if='o.active' class='fa fa-check'></i>{{o.name}}</button></li></ul></span>",
                action: function(event, font) {
                    //Ask if event is really an event.
                    if (!!event.stopPropagation) {
                        //With this, you stop the event of textAngular.
                        event.stopPropagation();
                        //Then click in the body to close the dropdown.
                        $("body").trigger("click");
                    }
                    return this.$editor().wrapSelection('fontName', font);
                },
                options: [
                    { name: 'Sans-Serif', css: 'Arial, Helvetica, sans-serif' },
                    { name: 'Serif', css: "'times new roman', serif" },
                    { name: 'Wide', css: "'arial black', sans-serif" },
                    { name: 'Narrow', css: "'arial narrow', sans-serif" },
                    { name: 'Comic Sans MS', css: "'comic sans ms', sans-serif" },
                    { name: 'Courier New', css: "'courier new', monospace" },
                    { name: 'Garamond', css: 'garamond, serif' },
                    { name: 'Georgia', css: 'georgia, serif' },
                    { name: 'Tahoma', css: 'tahoma, sans-serif' },
                    { name: 'Trebuchet MS', css: "'trebuchet ms', sans-serif" },
                    { name: "Helvetica", css: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
                    { name: 'Verdana', css: 'verdana, sans-serif' },
                    { name: 'Proxima Nova', css: 'proxima_nova_rgregular' }
                ]
            });
            taRegisterTool('fontSize', {
                display: "<span class='bar-btn-dropdown dropdown'>" +
                    "<button class='btn btn-blue dropdown-toggle' type='button' ng-disabled='showHtml()' style='padding-top: 4px'><i class='fa fa-text-height'></i><i class='fa fa-caret-down'></i></button>" +
                    "<ul class='dropdown-menu'><li ng-repeat='o in options'><button class='btn btn-blue checked-dropdown' style='font-size: {{o.css}}; width: 100%' type='button' ng-click='action($event, o.value)'><i ng-if='o.active' class='fa fa-check'></i> {{o.name}}</button></li></ul>" +
                    "</span>",
                action: function(event, size) {
                    //Ask if event is really an event.
                    if (!!event.stopPropagation) {
                        //With this, you stop the event of textAngular.
                        event.stopPropagation();
                        //Then click in the body to close the dropdown.
                        $("body").trigger("click");
                    }
                    return this.$editor().wrapSelection('fontSize', parseInt(size));
                },
                options: [
                    { name: 'xx-small', css: 'xx-small', value: 1 },
                    { name: 'x-small', css: 'x-small', value: 2 },
                    { name: 'small', css: 'small', value: 3 },
                    { name: 'medium', css: 'medium', value: 4 },
                    { name: 'large', css: 'large', value: 5 },
                    { name: 'x-large', css: 'x-large', value: 6 },
                    { name: 'xx-large', css: 'xx-large', value: 7 }

                ]
            });
            // Add the button to the default toolbar definition
            taOptions.toolbar[1].push('backgroundColor', 'fontColor', 'fontName', 'fontSize');
            return taOptions;
        }]);
    }])
    .service('APIInterceptor', ["$cookieStore", function($cookieStore) {
        var service = this;
        service.request = function(config) {
            if ($cookieStore.get('loginAccess')) {
                config.headers.Authorization = $cookieStore.get('loginAccess').id;
            }
            return config;
        }
    }])
    .run(["$rootScope", "$state", "$cookieStore", "formlyConfig", "formlyValidationMessages", function($rootScope, $state, $cookieStore, formlyConfig, formlyValidationMessages) {
        $rootScope.test = true;
        $rootScope.$on('$locationChangeSuccess', function() {
            $rootScope.$state = $state;
            if($cookieStore.get('loginAccess') == undefined){
                $rootScope.hideView = true;
                $state.go('login');
            }
            $rootScope.userDetails = $cookieStore.get('loginAccess');
        });
    }])
    .config(["$stateProvider", "$urlRouterProvider", "$httpProvider", "formlyConfigProvider", function($stateProvider, $urlRouterProvider, $httpProvider, formlyConfigProvider) {
        $stateProvider.state('login', {
            title: 'IELTS',
            url: "/login",
            templateUrl: "app/login/index.html",
            controller: 'loginCtrl'
        })
        //login end
        .state('logout', {
            url: "/logout",
            controller: 'logoutCtrl',
            templateUrl: "app/logout/index.html"
        })
// logout end
// userlist
        .state('users', {
            url: "/users",
            views: {
                "@": {
                    templateUrl: "app/users/list.html",
                    controller: 'usersListCtrl'
                }
            },
            title: 'users List',
            breadcrumb: {
                class: 'highlight',
                text: 'List',
                stateName: 'users'
            }
        })
.state('users.create', {
    url: "/create/:id",
    views: {
        "@": {
            templateUrl: "app/users/create.html",
            controller: 'userCreateCtrl'
        }
    },
    title: 'Create user',
    breadcrumb: {
        class: 'highlight',
        text: 'Create',
        stateName: 'users.create'
    }
})

        .state('photogallery', {
            url: "/photogallery",
            views: {
                "@": {
                    templateUrl: "app/photogallery/list.html",
                    controller: 'photogalleryListCtrl'
                }
            },
            title: 'photogallery List',
            breadcrumb: {
                class: 'highlight',
                text: 'List',
                stateName: 'photogallery'
            }
        })

        .state('photogallery.create', {
            url: "/create/:id",
            views: {
                "@": {
                    templateUrl: "app/photogallery/create.html",
                    controller: 'photogalleryCreateCtrl'
                }
            },
            title: 'Create photogallery',
            breadcrumb: {
                class: 'highlight',
                text: 'Create',
                stateName: 'photogallery.create'
            }
        })

        .state('photogallery.edit', {
            url: "/edit/:id?:catId",
            views: {
                "@": {
                    templateUrl: "app/photogallery/create.html",
                    controller: 'photogalleryCreateCtrl'
                }
            },
            title: 'Edit photogallery',
            breadcrumb: {
                class: 'highlight',
                text: 'Edit',
                stateName: 'photogallery.edit'
            }
        })
        // photogallery end

   
      .state('vediogallery', {
            url: "/vediogallery",
            views: {
                "@": {
                    templateUrl: "app/vediogallery/list.html",
                    controller: 'vediogalleryListCtrl'
                }
            },
            title: 'vediogallery List',
            breadcrumb: {
                class: 'highlight',
                text: 'List',
                stateName: 'vediogallery'
            }
        })

        .state('vediogallery.create', {
            url: "/create/:id",
            views: {
                "@": {
                    templateUrl: "app/vediogallery/create.html",
                    controller: 'vediogalleryCreateCtrl'
                }
            },
            title: 'Create vediogallery',
            breadcrumb: {
                class: 'highlight',
                text: 'Create',
                stateName: 'vediogallery.create'
            }
        })

        .state('vediogallery.edit', {
            url: "/edit/:id?:catId",
            views: {
                "@": {
                    templateUrl: "app/vediogallery/create.html",
                    controller: 'vediogalleryCreateCtrl'
                }
            },
            title: 'Edit vediogallery',
            breadcrumb: {
                class: 'highlight',
                text: 'Edit',
                stateName: 'vediogallery.edit'
            }
        })
    //    video gallaery end
    .state('writingreview', {
        url: "/writingreview",
        views: {
            "@": {
                templateUrl: "app/writingreview/list.html",
                controller: 'writingreviewListCtrl'
            }
        },
        title: 'writingreview List',
        breadcrumb: {
            class: 'highlight',
            text: 'List',
            stateName: 'writingreview'
        }
    })
    .state('writingreview.create', {
        url: "/create/:userid?testid:totalid?:fullname",
        // url: '/videoviewans/:catid?:subcatid?:queid',
        views: {
            "@": {
                templateUrl: "app/writingreview/create.html",
                controller: 'writingreviewCreateCtrl'
            }
        },
        title: 'Create writingreview',
        breadcrumb: {
            class: 'highlight',
            text: 'Create',
            stateName: 'writingreview.create'
        }
    })
    //awsreview
        .state('subcategory', {
            url: "/subcategory",
            views: {
                "@": {
                    templateUrl: "app/subcategory/list.html",
                    controller: 'subcategoryListCtrl'
                }
            },
            title: 'subcategory List',
            breadcrumb: {
                class: 'highlight',
                text: 'List',
                stateName: 'subcategory'
            }
        })
        .state('subcategory.create', {
            url: "/create/:id",
            views: {
                "@": {
                    templateUrl: "app/subcategory/create.html",
                    controller: 'subcategoryCreateCtrl123'
                }
            },
            title: 'Create subcategory',
            breadcrumb: {
                class: 'highlight',
                text: 'Create',
                stateName: 'subcategory.create'
            }
        })
//    video sub category end

    .state('feedback', {
            url: "/feedback",
            views: {
                "@": {
                    templateUrl: "app/feedback/list.html",
                    controller: 'feedbackListCtrl'
                }
            },
            title: 'feedback List',
            breadcrumb: {
                class: 'highlight',
                text: 'List',
                stateName: 'feedback'
            }
        })
// feed back end

       
         .state('quationsvideo', {
            url: "/quationsvideo",
            views: {
                "@": {
                    templateUrl: "app/quationsvideo/list.html",
                    controller: 'quationsvideoListCtrl'
                }
            },
            title: 'Questions List',
            breadcrumb: {
                class: 'highlight',
                text: 'List',
                stateName: 'quationsvideo'
            }
        })

        .state('quationsvideo.create', {
            url: "/create/:id",
            views: {
                "@": {
                    templateUrl: "app/quationsvideo/create.html",
                    controller: 'quationsvideoCreateCtrl'
                }
            },
            title: 'Create quationsvideo',
            breadcrumb: {
                class: 'highlight',
                text: 'Create',
                stateName: 'quationsvideo.create'
            }
        })

        .state('quationsvideo.edit', {
            url: "/edit/:id?:catId",
            views: {
                "@": {
                    templateUrl: "app/quationsvideo/create.html",
                    controller: 'quationsvideoCreateCtrl'
                }
            },
            title: 'Edit quationsvideo',
            breadcrumb: {
                class: 'highlight',
                text: 'Edit',
                stateName: 'quationsvideo.edit'
            }
        })

        // questions end
        .state('quations', {
            url: "/quations/:id",
            views: {
                "@": {
                    templateUrl: "app/quations/list.html",
                    controller: 'quationsListCtrl'
                }
            },
            title: 'questions List',
            breadcrumb: {
                class: 'highlight',
                text: 'List',
                stateName: 'quations'
            }
        })

        .state('quations.create', {
            url: "/create/:id",
            views: {
                "@": {
                    templateUrl: "app/quations/create.html",
                    controller: 'quationsCreateCtrl'
                }
            },
            title: 'Create quations',
            breadcrumb: {
                class: 'highlight',
                text: 'Create',
                stateName: 'quations.create'
            }
        })

        .state('quations.edit', {
            url: "/edit/:qid",
            views: {
                "@": {
                    templateUrl: "app/quations/create.html",
                    controller: 'quationsCreateCtrl'
                }
            },
            title: 'Edit quations',
            breadcrumb: {
                class: 'highlight',
                text: 'Edit',
                stateName: 'quations.edit'
            }
        })

        // questions end
        .state('paragraph', {
            url: "/paragraph",
            views: {
                "@": {
                    templateUrl: "app/paragraph/list.html",
                    controller: 'paragraphListCtrl'
                }
            },
            title: 'paragraph List',
            breadcrumb: {
                class: 'highlight',
                text: 'List',
                stateName: 'paragraph'
            }
        })

        .state('paragraph.create', {
            url: "/create/:id",
            views: {
                "@": {
                    templateUrl: "app/paragraph/create.html",
                    controller: 'paragraphCreateCtrl'
                }
            },
            title: 'Create paragraph',
            breadcrumb: {
                class: 'highlight',
                text: 'Create',
                stateName: 'paragraph.create'
            }
        })

        .state('paragraph.edit', {
            url: "/edit/:id?:catId",
            views: {
                "@": {
                    templateUrl: "app/paragraph/create.html",
                    controller: 'paragraphCreateCtrl'
                }
            },
            title: 'Edit paragraph',
            breadcrumb: {
                class: 'highlight',
                text: 'Edit',
                stateName: 'paragraph.edit'
            }
        })
            .state('test', {
                url: "/test",
                views: {
                    "@": {
                        templateUrl: "app/test/list.html",
                        controller: 'testListCtrl'
                    }
                },
                title: 'test List',
                breadcrumb: {
                    class: 'highlight',
                    text: 'List',
                    stateName: 'test'
                }
            })
    
            .state('test.create', {
                url: "/create/:id",
                views: {
                    "@": {
                        templateUrl: "app/test/create.html",
                        controller: 'testCreateCtrl'
                    }
                },
                title: 'Create test',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Create',
                    stateName: 'test.create'
                }
            })
    
            .state('test.edit', {
                url: "/edit/:id?:catId",
                views: {
                    "@": {
                        templateUrl: "app/test/create.html",
                        controller: 'testCreateCtrl'
                    }
                },
                title: 'Edit test',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Edit',
                    stateName: 'test.edit'
                }
            })
            // test end
            .state('videotest', {
                url: "/videotest",
                views: {
                    "@": {
                        templateUrl: "app/videotest/list.html",
                        controller: 'videotestListCtrl'
                    }
                },
                title: 'Test List',
                breadcrumb: {
                    class: 'highlight',
                    text: 'List',
                    stateName: 'videotest'
                }
            })
    
            .state('videotest.create', {
                url: "/create/:id",
                views: {
                    "@": {
                        templateUrl: "app/videotest/create.html",
                        controller: 'videotestCreateCtrl'
                    }
                },
                title: 'Create videotest',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Create',
                    stateName: 'videotest.create'
                }
            })
    
            .state('videotest.edit', {
                url: "/edit/:id?:catId",
                views: {
                    "@": {
                        templateUrl: "app/videotest/create.html",
                        controller: 'videotestCreateCtrl'
                    }
                },
                title: 'Edit videotest',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Edit',
                    stateName: 'videotest.edit'
                }
            })
            // videotest end
    
        
        .state('practisecategory', {
            url: "/practisecategory",
            views: {
                "@": {
                    templateUrl: "app/practisecategory/list.html",
                    controller: 'practisecategoryListCtrl'
                }
            },
            title: 'practisecategory List',
            breadcrumb: {
                class: 'highlight',
                text: 'List',
                stateName: 'practisecategory'
            }
        })

        .state('practisecategory.create', {
            url: "/create/:id",
            views: {
                "@": {
                    templateUrl: "app/practisecategory/create.html",
                    controller: 'practisecategoryCreateCtrl'
                }
            },
            title: 'Create practisecategory',
            breadcrumb: {
                class: 'highlight',
                text: 'create',
                stateName: 'practisecategory.edit'
            }
        })

        .state('practisecategory.edit', {
            url: "/edit/:id",
            views: {
                "@": {
                    templateUrl: "app/practisecategory/create.html",
                    controller: 'practisecategoryCreateCtrl'
                }
            },
            title: 'Edit practisecategory',
            breadcrumb: {
                class: 'highlight',
                text: 'Edit',
                stateName: 'practisecategory.edit'
            }
        })


        // practise category end
        
        
        .state('practisesubcategory', {
            url: "/practisesubcategory",
            views: {
                "@": {
                    templateUrl: "app/practisesubcategory/list.html",
                    controller: 'practisesubcategoryListCtrl'
                }
            },
            title: 'practisesubcategory List',
            breadcrumb: {
                class: 'highlight',
                text: 'List',
                stateName: 'practisesubcategory'
            }
        })
        .state('practisesubcategory.create', {
            url: "/create/:id",
            views: {
                "@": {
                    templateUrl: "app/practisesubcategory/create.html",
                    controller: 'practisesubcategoryCreateCtrl'
                }
            },
            title: 'Create practisesubcategory',
            breadcrumb: {
                class: 'highlight',
                text: 'Create',
                stateName: 'practisesubcategory.create'
            }
        })
        //end
        .state('practiselesson', {
            url: "/practiselesson",
            views: {
                "@": {
                    templateUrl: "app/practiselesson/list.html",
                    controller: 'practiselessonListCtrl'
                }
            },
            title: 'practiselesson List',
            breadcrumb: {
                class: 'highlight',
                text: 'List',
                stateName: 'practiselesson'
            }
        })

        .state('practiselesson.create', {
            url: "/create/:id",
            views: {
                "@": {
                    templateUrl: "app/practiselesson/create.html",
                    controller: 'practiselessonCreateCtrl'
                }
            },
            title: 'Create practiselesson',
            breadcrumb: {
                class: 'highlight',
                text: 'Create',
                stateName: 'practiselesson.create'
            }
        })
        
 




        $urlRouterProvider.otherwise('login');
        $httpProvider.interceptors.push('APIInterceptor');
    }])
'use strict';

angular.module('inspinia').service('configurationService', ['$q', function($q) {
    this.baseUrl = function() {
        // return "http://localhost/ieltsservices/ielts/api";
       return "http://18.218.122.78:8080/ielts/api";
    }
    this.downUrl = function() {
        //  return "http://localhost/ieltsservices/ielts/";
       return "http://18.218.122.78:8080/ielts/";
    }

}]);
 'use strict';
 angular.module('inspinia')
     .controller('directiveList2', ["$scope", "$state", "$filter", "DTOptionsBuilder", "DTColumnDefBuilder", "$injector", "$attrs", "quotationservice", "$timeout", "customerService", function($scope, $state, $filter, DTOptionsBuilder, DTColumnDefBuilder, $injector, $attrs, quotationservice,$timeout,customerService) {
            
         var vm = this; 
         var numberFormat = function(n){return n<10 ? '0'+n : n}
         $scope.droppage  = 0;
         $scope.nexthideli = 0;
         $scope.statusTab  = 'date_of_birth';
         $scope.currentPages = 0;
          $scope.fromDate=String(numberFormat($scope.dobdate)+numberFormat($scope.dobmonth+1)) ;
             $scope.toDate=String(numberFormat($scope.dobdate)+numberFormat($scope.dobmonth+1)) ;       

            $scope.DateSelect=function(){
                 $scope.fromDate=$scope.fromDate ;
                 $scope.toDate=$scope.toDate ;
                 $scope.statusChange($scope.statusTab) ;
             }
         //Previous next 
         $scope.currentPage1 = function(type) {
             $scope.list = [];
             if (type == 'prev') {
                 //Pagination Prev
                 var devid = $scope.droppage / 10;
                 var decrement = devid - 1;
                 console.log(decrement);
                 $scope.droppage = decrement * 10;
                 console.log($scope.droppage);
             } else {
                 //Pagination Next
                 if ($filter('currentpage2')($scope.droppage) == 1) {
                     console.log($filter('currentpage2')($scope.droppage));
                     $scope.droppage = 10;
                 } else {
                     $scope.droppage = $filter('currentpage2')($scope.droppage) * 10;
                 }
                 //console.log(order);
                 console.log($scope.droppage);
             }
             $scope.gotopage($scope.droppage);
             //console.log(order);
         }
        //Goto pages 
         $scope.gotopage = function(selectedItem) {
            //console.log(selectedItem);
            if(selectedItem == null){
                 var curcount = 0;
                 $scope.nexthideli=0;
                 $scope.droppage=0;
                
            }
             $scope.list = [];
             //console.log($filter('currentpage')(selectedItem)) ;
             if (selectedItem == 0) {
                 var curcount = 0;
             } else {
                 var order = $filter('currentpages')(selectedItem);
                 var curcount = order * 10;
             }
                
               var id=$scope.statusTab+':'+$scope.fromDate+':'+$scope.toDate+':' ;
                  
                customerService.listdobdoa(id, curcount).then(function(data) {
                 //  console.log('enter');
                  
                 $scope.list = data;
             });
                
          
         }
         $scope.page = [];
         $scope.statusChange = function(id) {
                    

             $scope.fromDate=String(numberFormat($scope.dobdate)+numberFormat($scope.dobmonth+1)) ;
             $scope.toDate=String(numberFormat($scope.dobdate)+numberFormat($scope.dobmonth+1)) ;       
             $scope.statusTab = id;
             $scope.page = [];
             $scope.list = [];
             $scope.currentPages = 0;

             if(id != 10050) {

                if(id != null){
                      id=$scope.statusTab+':'+$scope.fromDate+':'+$scope.toDate+':' ;
                          customerService.listdobdoa(id).then(function(data) {
                     // console.log(data.count);
                     //$scope.list = [];
                     // $scope.list = data;
                     if (data.count > 10) {
                         $scope.pages = Math.ceil(data.count / 10);
                         var nexthide = $scope.pages - 1;
                         $scope.nexthideli = nexthide * 10;
                         // console.log('No Pages'+$scope.pages);
                         for (var i = 0; i < $scope.pages; i++) {
                             $scope.page.push({ id: i + 1, name: i * 10 });
                         }
                     } else {
                         $scope.pages = Math.ceil(10 / 10);
                         $scope.page.push({id:1,name:0});
                            
                     }
                 });
                }
               
                 
             }else{
                
                 // $scope.listalldata();
             }



             $scope.gotopage(0);

         }

         $scope.statusChange($scope.statusTab);

         $scope.PushIndexVal=0;
          $scope.PushId='';
         $scope.sendVal=function(val,index){
           $scope.sendpush=true ;
           $scope.PushIndexVal=index;
           $scope.PushId=val;
           console.log($scope.sendpush) ;
         }
         $scope.send=function(){
             var error = 0;
             if($scope.message== '' || $scope.message == undefined){
                alert('Enter Message')
                error++;
            }
           if(error == 0){
            $scope.msg={
                'customer_id' : $scope.PushId ,
                'message' : $scope.message 
            }

             $scope.sendpush=false ;
              $scope.list[$scope.PushId]=false ;
              console.log($scope.msg);
              $scope.message ='' ;

              customerService.pushMsg($scope.msg).then(function(data) {
                 //  console.log('enter');
                  
                  if (data.error == undefined) { 
                       
                         toastr.success('Sendpush Successfully Submited');
                    } else {
                         toastr.warning('Problem In SendPush');
                    } 


             });
           
             


           }


         }
        

     }]);
 'use strict';
 angular.module('inspinia')
     .controller('directiveList1', ["$scope", "$state", "$filter", "DTOptionsBuilder", "DTColumnDefBuilder", "$injector", "$attrs", "quotationservice", function($scope, $state, $filter, DTOptionsBuilder, DTColumnDefBuilder, $injector, $attrs, quotationservice) {
        $scope.list =[];
         var vm = this; 
         $scope.droppage  = 0;
         $scope.nexthideli = 0;
         $scope.statusTab  = 10050;
         $scope.currentPages = 0;

         $scope.fromDate22=$filter('date')(new Date(), 'yyyy-MM-dd');
         var makeDate = new Date($scope.fromDate22);
            makeDate = new Date(makeDate.setMonth(makeDate.getMonth() - 1));
                 
           var temp=$filter('date')(makeDate, 'yyyy-MM-dd'); 

            $scope.fromDate=String(temp) ;
          
              
         $scope.toDate=$filter('date')(new Date(), 'yyyy-MM-dd');;

         $scope.DateSelect=function(){
            
             $scope.fromDate=$scope.fromDate ;
              $scope.toDate=$scope.toDate ;
               $scope.statusChange($scope.statusTab) ;
         }
         //Previous next 
         $scope.currentPage1 = function(type) {
             $scope.list = [];
             if (type == 'prev') {
                 //Pagination Prev
                 var devid = $scope.droppage / 10;
                 var decrement = devid - 1;
                 console.log(decrement);
                 $scope.droppage = decrement * 10;
                 console.log($scope.droppage);
             } else {
                 //Pagination Next
                 if ($filter('currentpage2')($scope.droppage) == 1) {
                     console.log($filter('currentpage2')($scope.droppage));
                     $scope.droppage = 10;
                 } else {
                     $scope.droppage = $filter('currentpage2')($scope.droppage) * 10;
                 }
                 //console.log(order);
                 console.log($scope.droppage);
             }
             $scope.gotopage($scope.droppage);
             //console.log(order);
         }
        //Goto pages 
         $scope.gotopage = function(selectedItem) {
            //console.log(selectedItem);
            if(selectedItem == null){
                 var curcount = 0;
                 $scope.nexthideli=0;
                 $scope.droppage=0;
                 console.log('enter in');
            }
             $scope.list = [];
             //console.log($filter('currentpage')(selectedItem)) ;
             if (selectedItem == 0) {
                 var curcount = 0;
             } else {
                 var order = $filter('currentpages')(selectedItem);
                 var curcount = order * 10;
             }
             // $scope.currentPage = curcount - 1;
            if($scope.statusTab == 10050){
                 
                  var id=$scope.statusTab+':'+$scope.fromDate+':'+$scope.toDate+':' ;
                    console.log(id);
                quotationservice.listAllstatus(id,curcount).then(function(data) {
                 //  console.log('enter');
                 ///  console.log(data);
                 $scope.list = data;
             });

             }else{
                
               var id=$scope.statusTab+':'+$scope.fromDate+':'+$scope.toDate+':' ;
                  
                quotationservice.listQuotBystatus(id, curcount).then(function(data) {
                 //  console.log('enter');
                 console.log(data);
                 $scope.list = data;
             });
                
             } 
             
         }
         $scope.page = [];
         $scope.statusChange = function(id) {
                
             $scope.statusTab = id;
             $scope.page = [];
             $scope.list = [];
             $scope.currentPages = 0;

             if(id != 10050) {

                if(id != null){
                      id=$scope.statusTab+':'+$scope.fromDate+':'+$scope.toDate+':' ;
                          quotationservice.listQuotBystatus(id).then(function(data) {
                      console.log(data.count);
                     //$scope.list = [];
                     // $scope.list = data;
                     if (data.count > 10) {
                         $scope.pages = Math.ceil(data.count / 10);
                         var nexthide = $scope.pages - 1;
                         $scope.nexthideli = nexthide * 10;
                         // console.log('No Pages'+$scope.pages);
                         for (var i = 0; i < $scope.pages; i++) {
                             $scope.page.push({ id: i + 1, name: i * 10 });
                         }
                     } else {
                         $scope.pages = Math.ceil(10 / 10);
                         $scope.page.push({id:1,name:0});
                            
                     }
                 });
                }
               
                 
             }else if(id == 10050){
                 id=id+':'+$scope.fromDate+':'+$scope.toDate+':' ;
                 //console.log(id) ;
                 quotationservice.listAllstatus(id).then(function(data) {
                      console.log(data.count);
                     //$scope.list = [];
                     $scope.list = data;
                     if (data.count > 10) {
                         $scope.pages = Math.ceil(data.count / 10);
                         var nexthide = $scope.pages - 1;
                         $scope.nexthideli = nexthide * 10;
                         // console.log('No Pages'+$scope.pages);
                         for (var i = 0; i < $scope.pages; i++) {
                             $scope.page.push({ id: i + 1, name: i * 10 });
                         }
                     } else {
                         $scope.pages = Math.ceil(10 / 10);
                         $scope.page.push({id:1,name:0});
                            
                     }
                 });

             }else {
                
                 // $scope.listalldata();
             }



             $scope.gotopage(0);

         }

         $scope.statusChange($scope.statusTab);
        

     }]);


  'use strict';
 angular.module('inspinia')
   .controller('directiveList', ["$scope", "$state", "$filter", "DTOptionsBuilder", "DTColumnDefBuilder", "$injector", "$attrs", "orderService", function($scope, $state, $filter, DTOptionsBuilder, DTColumnDefBuilder, $injector, $attrs, orderService) {
        
        console.log('enter...');
         var vm = this; 
         $scope.droppage  = 0;
         $scope.nexthideli = 0;
         $scope.statusTab  = 10050;
         $scope.currentPages = 0;



         $scope.fromDate22=$filter('date')(new Date(), 'yyyy-MM-dd');
         var makeDate = new Date($scope.fromDate22);
            makeDate = new Date(makeDate.setMonth(makeDate.getMonth() - 1));
                 
           var temp=$filter('date')(makeDate, 'yyyy-MM-dd'); 

            $scope.fromDate=String(temp) ;
          
              
         $scope.toDate=$filter('date')(new Date(), 'yyyy-MM-dd');

         $scope.DateSelect=function(){
            
             $scope.fromDate=$scope.fromDate ;
              $scope.toDate=$scope.toDate ;
               $scope.statusChange($scope.statusTab) ;
         }
         //Previous next 
         $scope.currentPage1 = function(type) {
             $scope.list = [];
             if (type == 'prev') {
                 //Pagination Prev
                 var devid = $scope.droppage / 10;
                 var decrement = devid - 1;
                 console.log(decrement);
                 $scope.droppage = decrement * 10;
                 console.log($scope.droppage);
             } else {
                 //Pagination Next
                 if ($filter('currentpage2')($scope.droppage) == 1) {
                     console.log($filter('currentpage2')($scope.droppage));
                     $scope.droppage = 10;
                 } else {
                     $scope.droppage = $filter('currentpage2')($scope.droppage) * 10;
                 }
                 //console.log(order);
                 console.log($scope.droppage);
             }
             $scope.gotopage($scope.droppage);
             //console.log(order);
         }
        //Goto pages 
         $scope.gotopage = function(selectedItem) {
            //console.log(selectedItem);
            if(selectedItem == null){
                 var curcount = 0;
                 $scope.nexthideli=0;
                 $scope.droppage=0;
                 console.log('enter in');
            }
             $scope.list = [];
             //console.log($filter('currentpage')(selectedItem)) ;
             if (selectedItem == 0) {
                 var curcount = 0;
             } else {
                 var order = $filter('currentpages')(selectedItem);
                 var curcount = order * 10;
             }
             // $scope.currentPage = curcount - 1;
            if($scope.statusTab == 10050){
                 
                  var id=$scope.statusTab+':'+$scope.fromDate+':'+$scope.toDate+':' ;
                    console.log(id);
               orderService.listAllOrderstatus(id,curcount).then(function(data) {
                 //  console.log('enter');
            console.log(data);
                 $scope.list = data;
             });

             }else{
                
               var id=$scope.statusTab+':'+$scope.fromDate+':'+$scope.toDate+':' ;
                  
                  orderService.listOrderBystatus(id, curcount).then(function(data) {
                 //  console.log('enter');
                 ///  console.log(data);
                 $scope.list = data;
             });
                
             } 
             
         }
         $scope.page = [];
         $scope.statusChange = function(id) {
                
             $scope.statusTab = id;
             $scope.page = [];
             $scope.list = [];
             $scope.currentPages = 0;

             if(id != 10050) {
                if(id != null){
                      id=$scope.statusTab+':'+$scope.fromDate+':'+$scope.toDate+':' ;
                         orderService.listOrderBystatus(id).then(function(data) {
                      console.log(data.count);
                     //$scope.list = [];
                     // $scope.list = data;
                     if (data.count > 10) {
                         $scope.pages = Math.ceil(data.count / 10);
                         var nexthide = $scope.pages - 1;
                         $scope.nexthideli = nexthide * 10;
                         // console.log('No Pages'+$scope.pages);
                         for (var i = 0; i < $scope.pages; i++) {
                             $scope.page.push({ id: i + 1, name: i * 10 });
                         }
                     } else {
                         $scope.pages = Math.ceil(10 / 10);
                         $scope.page.push({id:1,name:0});
                            
                     }
                 });
                }
               
                 
             }else if(id == 10050){
                 id=id+':'+$scope.fromDate+':'+$scope.toDate+':' ;
                 //console.log(id) ;
                 orderService.listAllOrderstatus(id).then(function(data) {
                      console.log(data.count);
                     //$scope.list = [];
                     $scope.list = data;
                     if (data.count > 10) {
                         $scope.pages = Math.ceil(data.count / 10);
                         var nexthide = $scope.pages - 1;
                         $scope.nexthideli = nexthide * 10;
                         // console.log('No Pages'+$scope.pages);
                         for (var i = 0; i < $scope.pages; i++) {
                             $scope.page.push({ id: i + 1, name: i * 10 });
                         }
                     } else {
                         $scope.pages = Math.ceil(10 / 10);
                         $scope.page.push({id:1,name:0});
                            
                     }
                 });

             }else {
                
                 // $scope.listalldata();
             }
 
             $scope.gotopage(0);

         }

         $scope.statusChange($scope.statusTab);
          $scope.$watch('list',function(newval,oldval){
            console.log(newval.length) ;
            if(newval.length > 10){
                $scope.statusChange($scope.statusTab);
            }
         });


     }]);
'use strict';

angular.module('inspinia').service('writingreviewService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()

        $http.post(configurationService.baseUrl() + '/Subcategory/create_subcategory', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    // http://localhost/services/softprep/api/test/aws_cmsque_list
    this.getawsList = function(name) {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Test/getaws_writing/'+name).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    // $http.get(baseUrl+"uploads/" + $cookieStore.get("loginAccess").id + $cookieStore.get("testId") + '.json').then(function(data) {
    this.getawsQueList = function(testid) {
        var D = $q.defer();

        $http.get(configurationService.downUrl() +"uploads/"+testid + '.json').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.deletesubcategory = function(id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/Subcategory/deleteproduct/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    
    this.updatewritingQua = function(data) {
        var D = $q.defer()
        // $http.post(configurationService.baseUrl() + '/Test/writing_update_test', data).success(function(data) {
        $http.post(configurationService.baseUrl() + '/Test/save_test_file', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getLogindetails = function(userid) {
        var D = $q.defer();

        $http.get(configurationService.baseUrl() +"/User/loginget/"+userid ).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
'use strict';

angular.module('inspinia')
    .controller('writingreviewListCtrl', ["$scope", "$state", "$rootScope", "$interval", "photogalleryService", "writingreviewService", "$cookieStore", "$stateParams", "$timeout", "subcategoryService", function($scope, $state, $rootScope, $interval, photogalleryService,writingreviewService, $cookieStore, $stateParams, $timeout, subcategoryService) {
        var vm = this;
        $scope.categories = [{ "id": 1, "name": "Begumpet" }, { "id": 2, "name": "Dilsukhnagar" }, { "id": 3, "name": "Kukatpally" }, { "id": 4, "name": "Madhapur" }, { "id": 5, "name": "Vijayawada" }, { "id": 6, "name": "Guntur" },{ "id": 7, "name": "Other" }];
        if ($state.current.breadcrumb.text == "List") {
            $scope.regionList = [{}];
        }
        $scope.post={};
        // console.log($stateParams.catId);
        vm.view = function(id) {
            // $state.go('customers.view', {
            //     id: id
            // });
        }
        $interval(function() {
            if ($cookieStore.get('checkIsMiddle1') == 'completed') {
                // console.log('enter in');
                $cookieStore.put("checkIsMiddle1", "");
                location.reload();
            }
        }, 1000);
        $scope.catList =[] ;
        $scope.post.catVal= $cookieStore.get('loginAccess').branch;
        console.log( $scope.post.catVal);
        $scope.changeCategory=function(){
             
            $scope.catList = [];
            $scope.post.catVal="Begumpet"
            if($scope.post.catVal){
                writingreviewService.getawsList($scope.post.catVal).then(function(data) {
                    console.log(data);
                    if (data) {
                        $scope.catList = data;
                    } else {
                        $scope.errorLogin = "Login failed! Please Check Username And Password";
                        console.log('Please Check Username And Password');
                    }
                });
            }
           
        }
        $scope.changeCategory();
        $scope.review = function(id,testid,fullname) {
            // alert(id,testid,fullname);
            // console.log(id,testid,fullname);
           $state.go('writingreview.create',{'userid':id,'testid':testid,'totalid':id+testid,'fullname':fullname});
        }


    }]);
'use strict';
angular.module('inspinia').controller('writingreviewCreateCtrl', ["$scope", "$interval", "$cookieStore", "$state", "writingreviewService", "$rootScope", "vediogalleryService", "$stateParams", "FileUploader", "configurationService", "TestService", "$timeout", "subcategoryService", "$filter", function($scope,$interval,$cookieStore, $state,writingreviewService,$rootScope,vediogalleryService,$stateParams, FileUploader, configurationService, TestService,$timeout ,subcategoryService, $filter) {


    $scope.scores = [{ name: 1.0 ,id: 1.0 },{ name: 1.5 ,id: 1.5 }, { name: 2.0, id:2.0 },{ name: 2.5, id:2.5 },{ name: 3.0, id: 3.0 },{ name: 3.5, id: 3.5 },{ name: 4.0, id: 4.0 },{ name: 4.5, id: 4.5 },{ name: 5.0, id: 5.0 },{ name: 5.5, id: 5.5 },{ name: 6.0, id: 6.0 },{ name: 6.5, id: 6.5 },{ name: 7.0, id: 7.0 },{ name: 7.5, id: 7.5 },{ name: 8.0, id: 8.0 },{ name: 8.5, id: 8.5 },{ name: 9.0, id: 9.0 }];
    $scope.currentSection=0;
    $scope.currentQue=0 ;
    $scope.post = {};
    $scope.mainurl = configurationService.baseUrl();
    $scope.downUrl = configurationService.downUrl();
    $scope.actpara=0  ;
    $scope.actqua=0;
    $scope.show=false;
    //alltestList
    console.log($stateParams.totalid);
    console.log($stateParams.fullname);
    $scope.testid=$stateParams.totalid;
    $scope.testList = function() {
         writingreviewService.getLogindetails($stateParams.userid).then(function(data) {
            console.log(data);
            if (data) {

                $scope.catList = data;
            } else {
                $scope.errorLogin = "Login failed! Please Check Username And Password";
                console.log('Please Check Username And Password');
            }
        });
        writingreviewService.getawsQueList($scope.testid).then(function(data) {
            console.log(data.writing.part1);
            if (data) {
                $scope.totalObj=data;
               $scope.writingData=data.writing.part1.quetions;
              
             }else{
                $scope.errorLogin = "Login failed! Please Check Username And Password";
                //console.log('Please Check Username And Password');    
            }
            console.log($scope.totalObj);
        });
    }
    $scope.testList();
  
    $scope.checkAns=function(bol){
        console.log(bol);
        $scope.alltestList[$scope.currentQue].btnChecked = bol ;
        if(bol == 1){
            $scope.alltestList[$scope.currentQue].options[0].is_answer =  $scope.alltestList[$scope.currentQue].options[0].user_aws  ;
        }else{
            $scope.alltestList[$scope.currentQue].options[0].is_answer =  "------@&%" ;
        }
       
    }
    $scope.btnNext=function(){
        $scope.errorMsg="" ;
        $scope.actpara++ ;   
    }
    $scope.btnPre=function(){
        $scope.errorMsg="" ;
        $scope.actpara-- ;   
    }
    $scope.btnSave=function(){
        $scope.show=true;
        $scope.errorMsg="" ;
    
            var totalCountgetScr = 0 ;
            var writingbonds=0;
            var totalscore=0;
            $scope.totalObj.result.writing=[] ;
            angular.forEach($scope.writingData,function(val ,key){
                // console.log(val.options);
                
                    // console.log(val);
                    // totalCountgetScr= totalCountgetScr + val.options[0].score ;
                    // writingbonds=Math.round(totalCountgetScr/2);
                    $scope.totalObj.result.writing.push({"bonds":val.options[0].score ,"result": true});
             
                //   console.log(writingbonds);
            });
           
          
            console.log( $scope.totalObj);
            $scope.totalObj.awastatus="completed";
            var sendObj = {
                "useId": $stateParams.userid,
                "test_name": $stateParams.testid,
                "fullname": $stateParams.fullname,
                "toalObj": $scope.totalObj,
                "testId":  $stateParams.testid,
                "testType":"save",
                "awsstatus":"completed",
                "graphdata":{},
                "resultData": $scope.totalObj.result,
                "r2":"",
                "r3":""
                }
        console.log(sendObj);
        
        writingreviewService.updatewritingQua(sendObj).then(function(res) {
              console.log(res);
            //   if(res.response==success){
            //     $state.go("writingreview");
            //     $window.reload();
            //   }
            
            $state.go('writingreview');
        });
        
    }

    if ($state.current.breadcrumb.text == 'Edit') {
        // vediogalleryService.getproduct($stateParams.Id).then(function(data) {
        //     if (data.error == undefined) {


        //         vediogalleryService.getproductsubcat($scope.productsubcat).then(function(data) {
        //             if (data.error == undefined) {
        //                 console.log(data);

        //             } else {
        //                 toastr.warning('Error in User details!');
        //             }
        //         });

        //     } else {
        //         toastr.warning('Error in User details!');
        //     }
        // });
    }


    $scope.add = function() {

        var error = 0;
        if (error == 0) {

            /// Inset values   
            subcategoryService.create($scope.post).then(function(data) {
                console.log(data[0].response);
                if (data[0].response == "success") {
                    console.log(data);
                    $state.go('subcategory');
                } else {
                    toastr.warning('Error : Not getting Product data by id !');
                }
            });
        }
    }
    $scope.edit = function() {

        var error = 0;
        if (error == 0) {
            console.log($scope.model);
            //  Update values 
            vediogalleryService.updateproduct($scope.post, $stateParams.Id).then(function(data) {
                if (data.status == 200) {
                    $state.go('vediogallery');
                } else {
                    toastr.warning('Error : Not getting coupons data by id !');
                }
            });
        }

    }


    $scope.onSubmit = function(form) {

        if ($state.current.breadcrumb.text == 'Edit') {
            $scope.edit(form)
        } else {
            $scope.add(form);
        }
    }

    $timeout(function() { $scope.overlaystatus = true; }, 500);
    $scope.deleteimg = function(id) {
        $scope.imgobj.splice(id, 1);
    }





}]);
'use strict';

angular.module('inspinia')
    .controller('videotestListCtrl', ["$scope", "$state", "$rootScope", "$cookieStore", "$stateParams", "$timeout", "VideoTestService", function($scope, $state, $rootScope, $cookieStore, $stateParams, $timeout, VideoTestService) {
        var vm = this;

        if ($state.current.breadcrumb.text == "List") {
            $scope.regionList = [{}];
        }

        // console.log($stateParams.catId);
        vm.view = function(id) {
            // $state.go('customers.view', {
            //     id: id
            // });
        }
        $scope.list = function() {
            VideoTestService.getTetstList($scope.login).then(function(data) {
               // console.log(data);
                if (data) {
                    $scope.testList = data;
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                    //console.log('Please Check Username And Password');
                }
            });
        }
        $scope.list();

        $scope.edit = function(parmid) {
            $state.go('products.edit', { id: parmid });
        }
        $scope.delete = function(obj) {
           // alert(5);
      console.log(obj);
           
            VideoTestService.deleteTest(obj.testid).then(function(data) {
                if (data.error.status == 200) {
                    //  toaster.success('product Successfully Deleted!');
                    $scope.list();
                } else {
                    console.log(data.error);
                    toaster.warning('Unable to delete');
                }
            })
        }
     
    }]);
'use strict';

angular.module('inspinia').controller('videotestCreateCtrl', ["$scope", "photogalleryService", "$state", "$rootScope", "$stateParams", "FileUploader", "quationsService", "configurationService", "$timeout", "VideoTestService", "categoryService", "$filter", function($scope, photogalleryService, $state, $rootScope, $stateParams, FileUploader, quationsService, configurationService, $timeout, VideoTestService, categoryService, $filter) {
    $scope.post={} ;
    $scope.categories = [{ name: "verbal" ,id: "verbal" }, { name: "quant", id: "quant" },{ name: "awa", id: "awa" },{ name: "Quant", id: "quant" }];

    // $scope.quaList = function() {
    //     quationsService.getQuationstList().then(function(data) {
    //         console.log(data);
    //         if (data) {
    //             $scope.quaData = data.questions;

    //         } else {
    //             $scope.errorLogin = "Login failed! Please Check Username And Password";
    //             console.log('Please Check Username And Password');
    //         }
    //     });
    // }
    // $scope.quaList();
    // dropdown
    $scope.quaData = [];
    $scope.post.catVal= 'awa' ;
    $scope.changeCategory=function(){
     $scope.quaData = [];
                if($scope.post.catVal){
                    VideoTestService.getQuationstCatByNameList($scope.post.catVal).then(function(data) {
                        console.log(data);
                        if (data) {
                            $scope.quaData = data;
                        } else {
                            $scope.errorLogin = "Login failed! Please Check Username And Password";
                            console.log('Please Check Username And Password');
                        }
                    });
                }
    }
    $scope.changeCategory();
// end dropdown
// input
$scope.quaData = [];
$scope.post.catVal1= '' ;
$scope.changeCategory1=function(){
 $scope.quaData = [];
            if($scope.post.catVal1){
                VideoTestService.getQuationstCatByNameList1($scope.post.catVal1).then(function(data) {
                    console.log(data);
                    if (data) {
                        $scope.quaData = data;
                    } else {
                        $scope.errorLogin = "Login failed! Please Check Username And Password";
                        console.log('Please Check Username And Password');
                    }
                });
            }
}
$scope.changeCategory1();
// end input

    $scope.totalQua = [];
    $scope.post = { "testid": "", "name": "", "status": 0 };
    $scope.post.status = 1001;
    $scope.indexTemp = 0;
    $scope.post.sections = [{
        "questionids": [],
        "testid": ""
    }];
    $scope.mainurl = configurationService.baseUrl();
    $scope.downUrl = configurationService.downUrl();
    $scope.addSection = function() {
        $scope.post.sections.push({
            "questionids": [],
            "testid": ""
        });
    }
    $scope.removeSection = function(index) {
        if ($scope.post.sections.length != 1) {
            $scope.post.sections.splice(index, 1);
        }
    }
    $scope.testtime=[{"id":"00:30:00","name": "30 MIN"},{"id":"00:35:00","name": "35 MIN"},{"id":"60:00:00","name": "60 MIN"}];
    $scope.catList = [{ "id": 1, "name": "FULL LENGTH" }, { "id": 2, "name": "VIDEO TEST" }, { "id": 3, "name": "PRATICE TEST" }];
  
    $scope.indexApp = function(index) {
        $scope.indexTemp = index;
        console.log($scope.indexTemp);
    }
    $scope.getQuaId = function(qua) {
        console.log(qua.trackid);

        var getIndex = _.findIndex($scope.totalQua, function(o) {
            return o === qua.trackid;
        });
        if (getIndex != -1) {

            $scope.totalQua.splice(getIndex, 1);
            $scope.post.sections[$scope.indexTemp].questionids.splice(getIndex, 1);

        } else {
            $scope.totalQua.push(qua.trackid);
            $scope.post.sections[$scope.indexTemp].questionids.push(qua.trackid);
        }
        console.log($scope.totalQua, $scope.post.sections);
        console.log($scope.post);
        //$scope.post.sections
        //  $scope.totalQua
    }
    if ($state.current.breadcrumb.text == 'Edit') {

        VideoTestService.getProductDetail($stateParams.id).then(function(data) {
            if (data.error.status == 200) {
                $scope.post = data.error.data;
                $scope.post.status = Number($scope.post.status);
                $scope.showimage = true;
                console.log(data.error.data);
            } else {
                toastr.warning('Error in User details!');
            }
        });
    }


    $scope.add = function() {

        var error = 0;
        if (error == 0) {
            $scope.post.status = Number($scope.post.status);
            /// Inset values   
            VideoTestService.create($scope.post).then(function(data) {
                console.log(data);
                if (data[0].response == "success") {
                    $state.go('videotest');
                } else {
                    toastr.warning('Error : Not getting id !');
                }
            });
        }
    }
    $scope.edit = function() {
        var error = 0;
        if (error == 0) {
            console.log($scope.post);
            //  Update values 
            VideoTestService.updateproduct($scope.post).then(function(data) {
                if (data[0].response == "success") {
                    $state.go('quations');
                } else {
                    toastr.warning('Error : Not getting coupons data by id !');
                }
            });
        }

    }


    $scope.onSubmit = function(form) {

        if ($state.current.breadcrumb.text == 'Edit') {
            $scope.edit(form)
        } else {
            $scope.add(form);
        }
    }

    $timeout(function() { $scope.overlaystatus = true; }, 500);
    $scope.deleteimg = function(id) {
        //$scope.post.images.splice(id, 1);

        $scope.post.thumb = "";
        $scope.showimage = false;
    }





}]);
'use strict';

angular.module('inspinia').service('VideoTestService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/Testvideo/create_test', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getTetstList = function() {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Testvideo/test_all_list').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.getQuationstCatByNameList = function(name) {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Queoption/categoryget_by_cat/'+name).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getQuationstCatByNameList1 = function(name) {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Queoption1/categoryget_by_cat/'+name).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    

    // this.deleteProduct = function(id) {
    //     var D = $q.defer()
    //     $http.delete(configurationService.baseUrl() + '/test/testdel/' + id).success(function(data) {
    //         D.resolve(data);
    //     }).error(function(data) {
    //         D.resolve(data);
    //     });
    //     return D.promise;
    // }
    this.deleteTest = function(id) {
     
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/Test/testdel/' +id).success(function(data) {
            D.resolve(data);
            console.log(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.updateproduct = function(data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/category/productUpdate', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
'use strict';

angular.module('inspinia').service('vediogalleryService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()

        $http.post(configurationService.baseUrl() + '/Videos/create_videos', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getCategoryList = function() {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Videos/videos_all_list').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.listRegions = function() {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/franchises').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.deleteRegion = function(id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/franchises/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getRegion = function(id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/franchises/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getAllRegion = function() {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/franchises/').success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getRegionByCategory = function(id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/categories/' + id + '/regions').success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.updateRegion = function(data) {
        var D = $q.defer()
        $http.put(configurationService.baseUrl() + '/franchises', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
'use strict';

angular.module('inspinia')
    .controller('vediogalleryListCtrl', ["$scope", "$state", "$rootScope", "photogalleryService", "$cookieStore", "$stateParams", "$timeout", "vediogalleryService", function($scope, $state, $rootScope, photogalleryService, $cookieStore, $stateParams, $timeout, vediogalleryService) {
        var vm = this;

        if ($state.current.breadcrumb.text == "List") {
            $scope.regionList = [{}];
        }

        // console.log($stateParams.catId);
        vm.view = function(id) {
            // $state.go('customers.view', {
            //     id: id
            // });
        }

        $scope.list = function() {


            vediogalleryService.getCategoryList($scope.login).then(function(data) {
                console.log(data);
                if (data) {

                    $scope.catList = data;
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                    console.log('Please Check Username And Password');
                }
            });


        }

        $scope.list();


        $scope.delete = function(id) {

            photogalleryService.deletegellery(id).then(function(data) {
                if (data.error.status == 200) {
                    //toaster.success('Item Successfully Deleted!');
                    $scope.list();
                } else {
                    console.log(data.error);
                    //toaster.warning('Unable to delete');
                }
            })
        }


    }]);
'use strict';

angular.module('inspinia').controller('vediogalleryCreateCtrl', ["$scope", "$state", "$rootScope", "$stateParams", "FileUploader", "configurationService", "VideoTestService", "$timeout", "vediogalleryService", "$filter", function($scope, $state, $rootScope, $stateParams, FileUploader, configurationService, VideoTestService,$timeout, vediogalleryService, $filter) {


    $scope.post = {};
    //  $scope.post.status = 1001;

    // $scope.post.subcat = [{
    //     "titlelink": "",
    //     "youtube_uniqid": "",
    //     //"status": true
    // }];

    $scope.mainurl = configurationService.baseUrl();
    $scope.downUrl = configurationService.downUrl();

    //alltestList


    $scope.testList = function() {
        VideoTestService.getTetstList($scope.login).then(function(data) {
           console.log(data);
            if (data) {
                $scope.alltestList = data;
                $scope.alltestList.push({id:"",name:"Please select test"});
                // $scope.post.trackid ="" ;
            } else {
                $scope.errorLogin = "Login failed! Please Check Username And Password";
                //console.log('Please Check Username And Password');
            }
        });
    }
    $scope.testList();
    // $scope.addOption = function() {

    //     // $scope.post.subcat.push({
    //     //     "titlelink": "",
    //     //     "youtube_uniqid": "",
           
    //     // });

    // }
    // $scope.removeOption = function(index) {
    //     if ($scope.post.subcat.length != 1) {
    //         $scope.post.subcat.splice(index, 1);
    //     }
    // }

    if ($state.current.breadcrumb.text == 'Edit') {
        // vediogalleryService.getproduct($stateParams.Id).then(function(data) {
        //     if (data.error == undefined) {


        //         vediogalleryService.getproductsubcat($scope.productsubcat).then(function(data) {
        //             if (data.error == undefined) {
        //                 console.log(data);

        //             } else {
        //                 toastr.warning('Error in User details!');
        //             }
        //         });

        //     } else {
        //         toastr.warning('Error in User details!');
        //     }
        // });
    }


    $scope.add = function() {

        var error = 0;
        if (error == 0) {

            /// Inset values   
            vediogalleryService.create($scope.post).then(function(data) {
                console.log(data[0].response);
                if (data[0].response == "success") {
                    console.log(data);
                    $state.go('vediogallery');
                } else {
                    toastr.warning('Error : Not getting Product data by id !');
                }
            });
        }
    }
    $scope.edit = function() {

        var error = 0;

        if (error == 0) {

            console.log($scope.model);
            //  Update values 
            vediogalleryService.updateproduct($scope.post, $stateParams.Id).then(function(data) {
                if (data.status == 200) {
                    $state.go('vediogallery');
                } else {
                    toastr.warning('Error : Not getting coupons data by id !');
                }
            });
        }

    }


    $scope.onSubmit = function(form) {

        if ($state.current.breadcrumb.text == 'Edit') {
            $scope.edit(form)
        } else {
            $scope.add(form);
        }
    }

    $timeout(function() { $scope.overlaystatus = true; }, 500);
    $scope.deleteimg = function(id) {
        $scope.imgobj.splice(id, 1);
    }





}]);
'use strict';

angular.module('inspinia').service('usersService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()
       
        $http.post(configurationService.baseUrl() + '/User/new_user', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.sendSms = function(data) {
        console.log(data);
        var D = $q.defer()
       
        $http.post(configurationService.baseUrl() + '/User/sms_integration', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    
    this.getsubcategoryList = function() {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/User/user_all_list').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
   
    // filter branchWiseList
    this.getBranchWiseList = function(name) {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/User/branchList_by_user/'+name).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    //    UserStutus Update
    
    // this.UpdateUserStatus = function(data) {
    //     console.log(data);
    //     var D = $q.defer();
    //      $http.post(configurationService.baseUrl() + '/User/new_status_update', data).success(function(data) {
    //         D.resolve(data);
    //     }).error(function(data) {
    //         D.resolve(data);
    //     });
    //     return D.promise;
    // }
    
    this.UpdateUserStatus = function(data) {
        console.log(data);
        var D = $q.defer()

        $http.post(configurationService.baseUrl() + '/User/new_status_update', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
   


    this.deletesubcategory = function(id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/Subcategory/deleteproduct/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }


}]);
'use strict';

angular.module('inspinia')
    .controller('usersListCtrl', ["$scope", "$state", "$rootScope", "$cookieStore", "$stateParams", "$timeout", "usersService", function($scope, $state, $rootScope, $cookieStore, $stateParams, $timeout, usersService) {
        var vm = this;
        $scope.post={} ;
        if ($state.current.breadcrumb.text == "List") {
            $scope.regionList = [{}];
        }

        // console.log($stateParams.catId);
        vm.view = function(id) {
            // $state.go('customers.view', {
            //     id: id
            // });
        }
        $scope.categories = [{ "id": 1, "name": "Begumpet" }, { "id": 2, "name": "Dilsukhnagar" }, { "id": 3, "name": "Kukatpally" }, { "id": 4, "name": "Madhapur" }, { "id": 5, "name": "Vijayawada" }, { "id": 6, "name": "Guntur" },{ "id": 7, "name": "Other" }];
        // $scope.list = function() {


        //     usersService.getsubcategoryList().then(function(data) {
        //         console.log(data);
        //         if (data) {

        //             $scope.catList = data;
        //         } else {
        //             $scope.errorLogin = "Login failed! Please Check Username And Password";
        //             console.log('Please Check Username And Password');
        //         }
        //     });


        // }

        // $scope.list();
        $scope.catList =[] ;
        $scope.post.catVal= 'Begumpet' ;
        $scope.changeCategory=function(){
             
            $scope.catList = [];
            if($scope.post.catVal){
                usersService.getBranchWiseList($scope.post.catVal).then(function(data) {
                    console.log(data);
                    if (data) {
                        $scope.catList = data;
                    } else {
                        $scope.errorLogin = "Login failed! Please Check Username And Password";
                        console.log('Please Check Username And Password');
                    }
                });
            }
           
        }
        $scope.changeCategory();
        $scope.statusData={};
        $scope.Activate=function(id){
            // alert("activate");
            $scope.statusData.status1=1001;
            $scope.statusData.useridV= id;
            usersService.UpdateUserStatus($scope.statusData).then(function(res){
                console.log(res);
                $scope.changeCategory();
            });
         
        }
         $scope.Deactivate=function(id){
            // alert("deactivate");
            $scope.statusData.status1=1002;
            $scope.statusData.useridV= id;
            usersService.UpdateUserStatus($scope.statusData).then(function(res){
                console.log(res);
            $scope.changeCategory();
            });
         }
         $scope.delete = function(id) {

            photogalleryService.deletegellery(id).then(function(data) {
                if (data.error.status == 200) {
                    //toaster.success('Item Successfully Deleted!');
                    $scope.list();
                } else {
                    console.log(data.error);
                    //toaster.warning('Unable to delete');
                }
            })
         }


    }]);
'use strict';

angular.module('inspinia').controller('userCreateCtrl', ["$scope", "$state", "$rootScope", "vediogalleryService", "$stateParams", "FileUploader", "configurationService", "TestService", "$timeout", "usersService", "$filter", function($scope, $state, $rootScope,vediogalleryService,$stateParams, FileUploader, configurationService, TestService,$timeout ,usersService, $filter) {
    $scope.post = {};
    $scope.post.passwordVal = "";
    $scope.post.usertype = "student";
    $scope.post.expiredate =moment(new Date()).add(1, 'years').format("YYYY-MM-DD HH:mm:ss");
    $scope.post.status =1001;
    $scope.post.acttype="paid";
    $scope.post.sourcereg="office";
   // console.log(moment(new Date()).add(1, 'years').format("YYYY-MM-DD HH:mm:ss"));
    $scope.catList = [{ "id": 1, "name": "Begumpet" }, { "id": 2, "name": "Dilsukhnagar" }, { "id": 3, "name": "Kukatpally" }, { "id": 4, "name": "Madhapur" }, { "id": 5, "name": "Vijayawada" }, { "id": 6, "name": "Guntur" },{ "id": 7, "name": "Other" }];
    $scope.mainurl = configurationService.baseUrl();
    $scope.downUrl = configurationService.downUrl();
    if ($state.current.breadcrumb.text == 'Edit') {
        
    }

    $scope.add = function() {
        var error = 0;
        if (error == 0) {
            /// Inset values   
            usersService.create($scope.post).then(function(data) {
                $scope.loader=false;
               // console.log( JSON.parse(data) );
                if (data[0].response == "success") {
                    console.log(data[0]);
                    usersService.sendSms($scope.post).then(function(data) {
                        $scope.loader=false;
                     });
                         $state.go('users');
                } else {
                    toastr.warning('Error : '+data[0].mesg);
                    $scope.loader=false;
                }
            });
        }
    }
    $scope.edit = function() {
        var error = 0;
        if (error == 0) {
            console.log($scope.model);
            //  Update values 
            vediogalleryService.updateproduct($scope.post, $stateParams.Id).then(function(data) {
                if (data.status == 200) {
                    $state.go('vediogallery');
                } else {
                    toastr.warning('Error : Not getting coupons data by id !');
                }
            });
        }
    }
    $scope.onSubmit = function(form) {
        $scope.loader=true;
        if ($state.current.breadcrumb.text == 'Edit') {
            $scope.edit(form)
        } else {
            $scope.add(form);
        }
    }
    $timeout(function() { $scope.overlaystatus = true; }, 500);
    $scope.deleteimg = function(id) {
        $scope.imgobj.splice(id, 1);
    }

}]);
'use strict';

angular.module('inspinia').service('TestService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/Test/create_test', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getTetstList = function() {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Test/test_all_list').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    

    // this.deleteProduct = function(id) {
    //     var D = $q.defer()
    //     $http.delete(configurationService.baseUrl() + '/test/testdel/' + id).success(function(data) {
    //         D.resolve(data);
    //     }).error(function(data) {
    //         D.resolve(data);
    //     });
    //     return D.promise;
    // }
    this.deleteTest = function(id) {
     
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/Test/testdel/' +id).success(function(data) {
            D.resolve(data);
            console.log(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.updateproduct = function(data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/category/productUpdate', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
'use strict';

angular.module('inspinia')
    .controller('testListCtrl', ["$scope", "$state", "$rootScope", "$cookieStore", "$stateParams", "$timeout", "TestService", function($scope, $state, $rootScope, $cookieStore, $stateParams, $timeout, TestService) {
        var vm = this;

        if ($state.current.breadcrumb.text == "List") {
            $scope.regionList = [{}];
        }

        // console.log($stateParams.catId);
        vm.view = function(id) {
            // $state.go('customers.view', {
            //     id: id
            // });
        }
        $scope.list = function() {
            TestService.getTetstList($scope.login).then(function(data) {
               // console.log(data);
                if (data) {
                    $scope.testList = data;
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                    //console.log('Please Check Username And Password');
                }
            });
        }
        $scope.list();

        $scope.edit = function(parmid) {
            $state.go('products.edit', { id: parmid });
        }
        $scope.delete = function(obj) {
           // alert(5);
      console.log(obj);
           
            TestService.deleteTest(obj.testid).then(function(data) {
                if (data.error.status == 200) {
                    //  toaster.success('product Successfully Deleted!');
                    $scope.list();
                } else {
                    console.log(data.error);
                    toaster.warning('Unable to delete');
                }
            })
        }
     
    }]);
'use strict';

angular.module('inspinia').controller('testCreateCtrl', ["$scope", "photogalleryService", "$state", "$rootScope", "$stateParams", "FileUploader", "quationsService", "configurationService", "$timeout", "TestService", "categoryService", "$filter", function($scope, photogalleryService, $state, $rootScope, $stateParams, FileUploader, quationsService, configurationService, $timeout, TestService, categoryService, $filter) {



    $scope.quaList = function() {
        quationsService.getQuationstList().then(function(data) {
            console.log(data);
            if (data) {
                $scope.quaData = data.questions;

            } else {
                $scope.errorLogin = "Login failed! Please Check Username And Password";
                console.log('Please Check Username And Password');
            }
        });
    }
    $scope.quaList();
    $scope.totalQua = [];
    $scope.post = { "testid": "", "name": "", "status": 0 };
    $scope.post.status = 1001;
    $scope.indexTemp = 0;
    $scope.post.sections = [{
        "questionids": [],
        "testid": ""
    }];
    $scope.mainurl = configurationService.baseUrl();
    $scope.downUrl = configurationService.downUrl();
    $scope.addSection = function() {
        $scope.post.sections.push({
            "questionids": [],
            "testid": ""
        });
    }
    $scope.removeSection = function(index) {
        if ($scope.post.sections.length != 1) {
            $scope.post.sections.splice(index, 1);
        }
    }
    $scope.testtime=[{"id":"00:30:00","name": "30 MIN"},{"id":"00:35:00","name": "35 MIN"},{"id":"60:00:00","name": "60 MIN"}];
    $scope.catList = [{ "id": 1, "name": "FULL LENGTH" }, { "id": 2, "name": "VIDEO TEST" }, { "id": 3, "name": "PRATICE TEST" }];
  
    $scope.indexApp = function(index) {
        $scope.indexTemp = index;
        console.log($scope.indexTemp);
    }
    $scope.getQuaId = function(qua) {
        console.log(qua.trackid);

        var getIndex = _.findIndex($scope.totalQua, function(o) {
            return o === qua.trackid;
        });
        if (getIndex != -1) {

            $scope.totalQua.splice(getIndex, 1);
            $scope.post.sections[$scope.indexTemp].questionids.splice(getIndex, 1);

        } else {
            $scope.totalQua.push(qua.trackid);
            $scope.post.sections[$scope.indexTemp].questionids.push(qua.trackid);
        }
        console.log($scope.totalQua, $scope.post.sections);
        console.log($scope.post);
        //$scope.post.sections
        //  $scope.totalQua
    }
    if ($state.current.breadcrumb.text == 'Edit') {

        TestService.getProductDetail($stateParams.id).then(function(data) {
            if (data.error.status == 200) {
                $scope.post = data.error.data;
                $scope.post.status = Number($scope.post.status);
                $scope.showimage = true;
                console.log(data.error.data);
            } else {
                toastr.warning('Error in User details!');
            }
        });
    }


    $scope.add = function() {

        var error = 0;
        if (error == 0) {
            $scope.post.status = Number($scope.post.status);
            /// Inset values   
            TestService.create($scope.post).then(function(data) {
                console.log(data);
                if (data[0].response == "success") {
                    $state.go('test');
                } else {
                    toastr.warning('Error : Not getting id !');
                }
            });
        }
    }
    $scope.edit = function() {
        var error = 0;
        if (error == 0) {
            console.log($scope.post);
            //  Update values 
            TestService.updateproduct($scope.post).then(function(data) {
                if (data[0].response == "success") {
                    $state.go('quations');
                } else {
                    toastr.warning('Error : Not getting coupons data by id !');
                }
            });
        }

    }


    $scope.onSubmit = function(form) {

        if ($state.current.breadcrumb.text == 'Edit') {
            $scope.edit(form)
        } else {
            $scope.add(form);
        }
    }

    $timeout(function() { $scope.overlaystatus = true; }, 500);
    $scope.deleteimg = function(id) {
        //$scope.post.images.splice(id, 1);

        $scope.post.thumb = "";
        $scope.showimage = false;
    }





}]);
'use strict';

angular.module('inspinia').service('TestService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()
        // http://localhost/ieltsservices/ielts/api/Pragoption/create_fulllength
        $http.post(configurationService.baseUrl() + '/Pragoption/create_fulllength', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getTetstList = function() {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Pragoption/test_all_list').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.getQuationstCatByNameList = function(name) {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Queoption/categoryget_by_cat/'+name).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getQuationstCatByNameList1 = function(name) {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Queoption1/categoryget_by_cat/'+name).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    

    // this.deleteProduct = function(id) {
    //     var D = $q.defer()
    //     $http.delete(configurationService.baseUrl() + '/test/testdel/' + id).success(function(data) {
    //         D.resolve(data);
    //     }).error(function(data) {
    //         D.resolve(data);
    //     });
    //     return D.promise;
    // }
    this.deleteTest = function(id) {
     
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/Test/testdel/' +id).success(function(data) {
            D.resolve(data);
            console.log(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.updateproduct = function(data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/category/productUpdate', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
'use strict';

angular.module('inspinia')
    .controller('testListCtrl', ["$scope", "$state", "$rootScope", "$cookieStore", "$stateParams", "$timeout", "TestService", function($scope, $state, $rootScope, $cookieStore, $stateParams, $timeout, TestService) {
        var vm = this;

        if ($state.current.breadcrumb.text == "List") {
            $scope.regionList = [{}];
        }

        // console.log($stateParams.catId);
        vm.view = function(id) {
            // $state.go('customers.view', {
            //     id: id
            // });
        }
        $scope.list = function() {
            TestService.getTetstList($scope.login).then(function(data) {
               // console.log(data);
                if (data) {
                    $scope.testList = data;
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                    //console.log('Please Check Username And Password');
                }
            });
        }
        $scope.list();

        $scope.edit = function(parmid) {
            $state.go('products.edit', { id: parmid });
        }
        $scope.delete = function(obj) {
           // alert(5);
      console.log(obj);
           
            TestService.deleteTest(obj.testid).then(function(data) {
                if (data.error.status == 200) {
                    //  toaster.success('product Successfully Deleted!');
                    $scope.list();
                } else {
                    console.log(data.error);
                    toaster.warning('Unable to delete');
                }
            })
        }
     
    }]);
'use strict';

angular.module('inspinia').controller('testCreateCtrl', ["$scope", "paragraphService", "photogalleryService", "$state", "$rootScope", "$stateParams", "FileUploader", "quationsService", "configurationService", "$timeout", "TestService", "categoryService", "$filter", function($scope, paragraphService,photogalleryService, $state, $rootScope, $stateParams, FileUploader, quationsService, configurationService, $timeout, TestService, categoryService, $filter) {
    // $scope.post={
    //    "title":"test1",
    //    "reading":[
    //                 {
    //                     "pra_trackid":"",
    //                     "time":"00:00:30"
    //                 },
    //                 {
    //                     "pra_trackid":"",
    //                     "time":"00:00:30"
    //                 }
    //             ],
    //     "writing" :[],
    //     "liesning":[],
    //     "time"    :"00:00:60",
    //     "type"    :"fulllength"  
    // } ;
      
    $scope.post={};
    $scope.post.f1=0;
    $scope.post.f2="";
    $scope.post.f3="";
    $scope.post.f4="";
    $scope.post.time="";
    $scope.sendingData=false ;
    $scope.mainurl = configurationService.baseUrl();
    $scope.downUrl = configurationService.downUrl();
    $scope.testtype=[{"id":"general","name":"General"},{"id":"acadamics","name":"Academic"}];

    // Variant category end
    var userUrl = $scope.userUrl = new FileUploader({
        scope: $scope,
        url: $scope.mainurl + '/images/upload',
        formData: [
            { key: 'value' }
        ]
    });

    userUrl.onSuccessItem = function(item, response, status, headers) {
        console.log(response);
        $scope.errorimg = '';
        $scope.img = response;

        var imageURL = '/uploads/' + response.path;
        $scope.post.f2 = imageURL;
        console.log($scope.post.f2);

    };
    $scope.deleteimg = function(id) {
      //  $scope.imgobj.splice(id, 1);
      $scope.post.f2 = "";
    }
    $scope.list = function() {
        paragraphService.getParatList($scope.login).then(function(data) {
            console.log(data);
            if (data) {
                $scope.quaList = data;
                $scope.quaList.push({trackid:"",title:"Please Select Paragraph"});
                // $scope.post.trackid="";
            } else {
                $scope.errorLogin = "Login failed! Please Check Username And Password";
                console.log('Please Check Username And Password');
            }
        });
    }
    $scope.list();
    $scope.quaData = [];
    

    $scope.indexTemp = 0;
    $scope.post.reading = [{
        "trackid": "",
        "time": ""
    }];
    $scope.post.lesioning = [{
        "trackid": "",
        "time": ""
    }];
    $scope.post.writting = [];
    $scope.post.lesioning = [];
    $scope.mainurl = configurationService.baseUrl();
    $scope.downUrl = configurationService.downUrl();
    $scope.addSection = function() {
        $scope.post.reading.push({
            "trackid": "",
            "time": ""
        });
    }
    $scope.addSection1 = function() {
        $scope.post.lesioning.push({
            "trackid": "",
            "time": ""
        });
    }
    $scope.addSection2 = function() {
        $scope.post.writting.push({
            "trackid": "",
            "time": ""
        });
    }
    $scope.removeSection2 = function(index) {
        alert(index);
        if ($scope.post.writting.length != 1) {
            $scope.post.writting.splice(index, 1);
        }
    }
    $scope.removeSection1 = function(index) {
        if ($scope.post.lesioning.length != 1) {
            $scope.post.lesioning.splice(index, 1);
        }
    }
    $scope.removeSection = function(index) {
        if ($scope.post.reading.length != 1) {
            $scope.post.reading.splice(index, 1);
        }
    }
    $scope.testtime=[{"id":1200,"name": "20 MIN"},{"id":1800,"name": "30 MIN"},{"id":2100,"name": "35 MIN"},{"id":3600,"name": "60 MIN"}];
    $scope.catList = [{ "id": 1, "name": "FULL LENGTH" }, { "id": 2, "name": "VIDEO TEST" }, { "id": 3, "name": "PRATICE TEST" }];
  
   

    $scope.add = function() {

        var error = 0;
        if (error == 0) {
            // $scope.post.status = Number($scope.post.status);
            /// Inset values   
            $scope.sendingData=true ;
            TestService.create($scope.post).then(function(data) {
                console.log(data);
                if (data[0].response == "success") {
                    $state.go('test');
                } else {
                    $scope.sendingData=false ;
                    toastr.warning('Error : Not getting id !');
                }
            });
        }
    }
    $scope.edit = function() {
        var error = 0;
        if (error == 0) {
            console.log($scope.post);
            //  Update values 
            TestService.updateproduct($scope.post).then(function(data) {
                if (data[0].response == "success") {
                    $state.go('quations');
                } else {
                    toastr.warning('Error : Not getting coupons data by id !');
                }
            });
        }

    }


    $scope.onSubmit = function(form) {

        if ($state.current.breadcrumb.text == 'Edit') {
            $scope.edit(form)
        } else {
            $scope.add(form);
        }
    }

    $timeout(function() { $scope.overlaystatus = true; }, 500);
    $scope.deleteimg = function(id) {
        //$scope.post.images.splice(id, 1);

        $scope.post.thumb = "";
        $scope.showimage = false;
    }





}]);
'use strict';

angular.module('inspinia').service('subcategoryService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()

        $http.post(configurationService.baseUrl() + '/Subcategory/create_subcategory', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getsubcategoryList = function() {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Subcategory/subcategory_all_list').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getTetstList11 = function() {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Testvideo/test_all_list').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    
    this.getsubcategoryDetail = function(id) {
        var D = $q.defer();

        $http.get(configurationService.baseUrl() + '/Subcategory/subcategorydetail/' + id).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }


    this.deletesubcategory = function(id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/Subcategory/deleteproduct/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.updatesubcategory = function(data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/Subcategory/productUpdate', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
'use strict';

angular.module('inspinia')
    .controller('subcategoryListCtrl', ["$scope", "$state", "$rootScope", "photogalleryService", "$cookieStore", "$stateParams", "$timeout", "subcategoryService", function($scope, $state, $rootScope, photogalleryService, $cookieStore, $stateParams, $timeout, subcategoryService) {
        var vm = this;
// alert("enter in");
        if ($state.current.breadcrumb.text == "List") {
            $scope.regionList = [{}];
        }

        // console.log($stateParams.catId);
        vm.view = function(id) {
            // $state.go('customers.view', {
            //     id: id
            // });
        }

        $scope.list = function() {


            subcategoryService.getsubcategoryList().then(function(data) {
                console.log(data);
                if (data) {

                    $scope.catList = data;
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                    console.log('Please Check Username And Password');
                }
            });


        }

        $scope.list();


        $scope.delete = function(id) {

            photogalleryService.deletegellery(id).then(function(data) {
                if (data.error.status == 200) {
                    //toaster.success('Item Successfully Deleted!');
                    $scope.list();
                } else {
                    console.log(data.error);
                    //toaster.warning('Unable to delete');
                }
            })
        }


    }]);
'use strict';

angular.module('inspinia').controller('subcategoryCreateCtrl123', ["$scope", "$state", "$rootScope", "vediogalleryService", "$stateParams", "FileUploader", "configurationService", "VideoTestService", "$timeout", "subcategoryService", "$filter", function($scope, $state, $rootScope,vediogalleryService,$stateParams, FileUploader, configurationService, VideoTestService,$timeout ,subcategoryService, $filter) {


    $scope.post = {};
    //  $scope.post.status = 1001;

    // $scope.post.subcat = [{
    //     "titlelink": "",
    //     "youtube_uniqid": "",
    //     //"status": true
    // }];

    $scope.mainurl = configurationService.baseUrl();
    $scope.downUrl = configurationService.downUrl();

    //alltestList
    $scope.alltestList11=[];
    $scope.testList = function() {
        subcategoryService.getTetstList11().then(function(data) {
           console.log(data);
            if (data) {
                $scope.alltestList11 = data;
               
                $scope.alltestList11.push({id:"",name:"Please select test"});
                // $scope.post.trackid ="" ;
            } else {
                $scope.errorLogin = "Login failed! Please Check Username And Password";
                //console.log('Please Check Username And Password');
            }
        });
    }
    $scope.testList();
    $scope.catList = function() {


        vediogalleryService.getCategoryList($scope.login).then(function(data) {
            console.log(data);
            if (data) {

                $scope.allCatList = data;
                $scope.allCatList.push({trackid:"",title:"Please select Category"});
                // $scope.post.catidVal ="" ;
            } else {
                $scope.errorLogin = "Login failed! Please Check Username And Password";
                console.log('Please Check Username And Password');
            }
        });


    }

    $scope.catList();

    // $scope.addOption = function() {

    //     // $scope.post.subcat.push({
    //     //     "titlelink": "",
    //     //     "youtube_uniqid": "",
           
    //     // });

    // }
    // $scope.removeOption = function(index) {
    //     if ($scope.post.subcat.length != 1) {
    //         $scope.post.subcat.splice(index, 1);
    //     }
    // }

    if ($state.current.breadcrumb.text == 'Edit') {
        // vediogalleryService.getproduct($stateParams.Id).then(function(data) {
        //     if (data.error == undefined) {


        //         vediogalleryService.getproductsubcat($scope.productsubcat).then(function(data) {
        //             if (data.error == undefined) {
        //                 console.log(data);

        //             } else {
        //                 toastr.warning('Error in User details!');
        //             }
        //         });

        //     } else {
        //         toastr.warning('Error in User details!');
        //     }
        // });
    }


    $scope.add = function() {

        var error = 0;
        if (error == 0) {

            /// Inset values   
            subcategoryService.create($scope.post).then(function(data) {
                console.log(data[0].response);
                if (data[0].response == "success") {
                    console.log(data);
                    $state.go('subcategory');
                } else {
                    toastr.warning('Error : Not getting Product data by id !');
                }
            });
        }
    }
    $scope.edit = function() {

        var error = 0;

        if (error == 0) {

            console.log($scope.model);
            //  Update values 
            vediogalleryService.updateproduct($scope.post, $stateParams.Id).then(function(data) {
                if (data.status == 200) {
                    $state.go('vediogallery');
                } else {
                    toastr.warning('Error : Not getting coupons data by id !');
                }
            });
        }

    }


    $scope.onSubmit = function(form) {

        if ($state.current.breadcrumb.text == 'Edit') {
            $scope.edit(form)
        } else {
            $scope.add(form);
        }
    }

    $timeout(function() { $scope.overlaystatus = true; }, 500);
    $scope.deleteimg = function(id) {
        $scope.imgobj.splice(id, 1);
    }





}]);
'use strict';

angular.module('inspinia').service('quationsvideoService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/Queoption/create_que', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getQuationstList = function() {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Queoption/que_list').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.getQuationstCatByNameList = function(name) {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Queoption/categoryget_by_cat/'+name).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }


    this.getProductDetail = function(id) {
        var D = $q.defer();
        $http.get(configurationService.baseUrl() + '/category/productdetail/' + id).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    

    this.deleteProduct = function(id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/Queoption/quotion/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.updateproduct = function(data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/category/productUpdate', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
'use strict';

angular.module('inspinia').service('quationsService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/Queoption/create_que', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getQuationstList = function() {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Queoption/que_list').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.getQuationstCatByNameList = function(name) {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Queoption/categoryget_by_cat/'+name).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }


    this.getProductDetail = function(id) {
        var D = $q.defer();
        $http.get(configurationService.baseUrl() + '/category/productdetail/' + id).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    

    this.deleteProduct = function(id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/Queoption/quotion/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.updateproduct = function(data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/category/productUpdate', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
'use strict';

angular.module('inspinia')
    .controller('quationsvideoListCtrl', ["$scope", "$state", "$rootScope", "$cookieStore", "$stateParams", "$timeout", "quationsvideoService", function($scope, $state, $rootScope, $cookieStore, $stateParams, $timeout, quationsvideoService) {
        var vm = this;
        $scope.post={} ;
        $scope.categories = [{ name: "Verbal" ,id: "verbal" }, { name: "Math", id: "math" },{ name: "awa", id: "awa" },{ name: "Quant", id: "quant" }];
        if ($state.current.breadcrumb.text == "List") {
            $scope.regionList = [{}];
        }

        // console.log($stateParams.catId);
        vm.view = function(id) {
            // $state.go('customers.view', {
            //     id: id
            // });
        }
        $scope.quaList =[] ;
        $scope.post.catVal= 'awa' ;
        $scope.changeCategory=function(){
             
            $scope.quaList = [];
            if($scope.post.catVal){
                quationsvideoService.getQuationstCatByNameList($scope.post.catVal).then(function(data) {
                    console.log(data);
                    if (data) {
                        $scope.quaList = data;
                    } else {
                        $scope.errorLogin = "Login failed! Please Check Username And Password";
                        console.log('Please Check Username And Password');
                    }
                });
            }
           
        }
        $scope.changeCategory();
        // $scope.list = function() {
        //     quationsvideoService.getQuationstList($scope.login).then(function(data) {
        //         console.log(data);
        //         if (data) {
        //             $scope.quaList = data;
        //         } else {
        //             $scope.errorLogin = "Login failed! Please Check Username And Password";
        //             console.log('Please Check Username And Password');
        //         }
        //     });
        // }
        // $scope.list();

        $scope.edit = function(parmid) {
            $state.go('products.edit', { id: parmid });
        }
        $scope.delete = function(id) {
            quationsvideoService.deleteProduct(id).then(function(data) {
                if (data.error.status == 200) {
                    //  toaster.success('product Successfully Deleted!');
                    $scope.list();
                } else {
                    console.log(data.error);
                    toaster.warning('Unable to delete');
                }
            })
        }

    }]);
'use strict';

angular.module('inspinia').controller('quationsvideoCreateCtrl', ["$scope", "photogalleryService", "$state", "$rootScope", "$stateParams", "FileUploader", "configurationService", "$timeout", "quationsvideoService", "categoryService", "$filter", function($scope, photogalleryService, $state, $rootScope, $stateParams, FileUploader, configurationService, $timeout, quationsvideoService, categoryService, $filter) {


    $scope.noOfBlanks = [{ name: 1, id: 1 },{ name: 2, id: 2 }, { name: 3, id: 3 }];

     $scope.categories = [{ name: "Verbal" ,id: "1" }, { name: "Math", id: "2" },{ name: "Awa", id: "3" },{ name: "Quant", id: "4" }];
   

    $scope.gallerylist = function() {
        photogalleryService.getCategoryList($scope.login).then(function(data) {
            console.log(data);
            if (data) {
                $scope.galleryData = data;

            } else {
                $scope.errorLogin = "Login failed! Please Check Username And Password";
                console.log('Please Check Username And Password');
            }
        });
    }
    $scope.gallerylist();
    $scope.post = { "trackid": "", "name": "", "noblk": 0 ,"paragraph":""};
    $scope.post.status = 1001;


    $scope.post.options = [{
        "question_id": "",
        "name": "",
        "is_answer": true
    }];

    $scope.mainurl = configurationService.baseUrl();
    $scope.downUrl = configurationService.downUrl();

    $scope.addOption = function() {

        $scope.post.options.push({
            "question_id": "",
            "name": "",
            "is_answer": false
        });

    }
    $scope.removeOption = function(index) {
        if ($scope.post.options.length != 1) {
            $scope.post.options.splice(index, 1);
        }
    }
    $scope.catList = [{ "id": 1, "name": "Radio type1" }, { "id": 2, "name": "checkbox type2" }]

    if ($state.current.breadcrumb.text == 'Edit') {

        quationsvideoService.getProductDetail($stateParams.id).then(function(data) {
            if (data.error.status == 200) {
                $scope.post = data.error.data;
                $scope.post.status = Number($scope.post.status);
                $scope.showimage = true;
                console.log(data.error.data);
            } else {
                toastr.warning('Error in User details!');
            }
        });
    }


    $scope.add = function() {

        var error = 0;
        if (error == 0) {
            $scope.post.status = Number($scope.post.status);
            /// Inset values   
            quationsvideoService.create($scope.post).then(function(data) {
                console.log(data);
                if (data[0].response == "success") {
                    $state.go('quations');
                } else {
                    toastr.warning('Error : Not getting id !');
                }
            });
        }
    }
    $scope.edit = function() {
        var error = 0;
        if (error == 0) {
            console.log($scope.post);
            //  Update values 
            quationsvideoService.updateproduct($scope.post).then(function(data) {
                if (data[0].response == "success") {
                    $state.go('quations');
                } else {
                    toastr.warning('Error : Not getting coupons data by id !');
                }
            });
        }

    }


    $scope.onSubmit = function(form) {

        if ($state.current.breadcrumb.text == 'Edit') {
            $scope.edit(form)
        } else {
            $scope.add(form);
        }
    }

    $timeout(function() { $scope.overlaystatus = true; }, 500);
    $scope.deleteimg = function(id) {
        //$scope.post.images.splice(id, 1);

        $scope.post.thumb = "";
        $scope.showimage = false;
    }





}]);
'use strict';

angular.module('inspinia').service('quationsService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()
        
        $http.post(configurationService.baseUrl() + '/Pragoption/create_paragraph_que', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getQuationstList = function(id) {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Pragoption/list_paragraph_ques/'+id).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.getQuationstCatByNameList = function(name) {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Queoption/categoryget_by_cat/'+name).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getQueByid = function(qid) {
        var D = $q.defer();
        $http.get(configurationService.baseUrl() + '/Pragoption/list_paragraph_quesoptnsByid/' + qid).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getParaById = function(tid) {
        var D = $q.defer();
        $http.get(configurationService.baseUrl() + '/Pragoption/list_paragraph_bytrackid/' + tid).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

   
    

    this.deleteProduct = function(id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/Queoption/quotion/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.updateQue = function(data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/Pragoption/update_parabyque', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
'use strict';

angular.module('inspinia')
    .controller('quationsListCtrl', ["$scope", "$state", "$rootScope", "$cookieStore", "$stateParams", "$timeout", "quationsService", function($scope, $state, $rootScope, $cookieStore, $stateParams, $timeout, quationsService) {
        var vm = this;
        $scope.post={} ;
        $scope.paratrackid=$stateParams.id;
        console.log($stateParams.id);
        $scope.list = function() {
            quationsService.getQuationstList($scope.paratrackid).then(function(data) {
                console.log(data);
                if (data) {
                    $scope.quaList = data;
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                    console.log('Please Check Username And Password');
                }
            });
        }
        $scope.list();
        $scope.create=function(paratrackid){
            alert(paratrackid);
        }

        $scope.edit = function(parmid) {
            alert(parmid);
            $state.go('quations.edit', { 'qid': parmid });
        }
        $scope.delete = function(id) {
            quationsService.deleteProduct(id).then(function(data) {
                if (data.error.status == 200) {
                    //  toaster.success('product Successfully Deleted!');
                    $scope.list();
                } else {
                    console.log(data.error);
                    // toaster.warning('Unable to delete');
                }
            })
        }

    }]);
'use strict';

angular.module('inspinia').controller('quationsCreateCtrl', ["$scope", "photogalleryService", "$state", "$rootScope", "$stateParams", "FileUploader", "configurationService", "$timeout", "quationsService", "categoryService", "$filter", function($scope, photogalleryService, $state, $rootScope, $stateParams, FileUploader, configurationService, $timeout, quationsService, categoryService, $filter) {
    $scope.post={};
    // $scope.post.que_trackid="";

    console.log($stateParams);
    $scope.orightml = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
    $scope.htmlcontent = $scope.orightml;
    $scope.disabled = false;
    $scope.post={
        "title" : "",
        "quetion" : "",
        "pra_trackid" : $stateParams.id,
        "type" :"",
        "f1" :0,
        "solution" :"",
        "f3" :"",
        "f4" :"" ,
        "options": [{"name": "", "is_answer" : [""] ,"user_aws":"" } ]
        };
        // $scope.post.question_type_id=3;
        $scope.addOption=function(){
            $scope.post.options.push({"id" : "0" , "question_id" : $scope.post.options[0].question_id ,  "name": "", "is_answer" : [""] ,"user_aws":"" });
        }
        $scope.removeOption=function(index){
            // console.log(index);
            if($scope.post.options.length !=1){
                $scope.post.options.splice(index, 1);
            }
        }
        $scope.removeOption1=function(pind,ind){
            // console.log(pind,ind);
            if($scope.post.options[pind].is_answer.length !=0){
                $scope.post.options[pind].is_answer.splice(ind, 1);
            }
        }
        
        $scope.addOption1=function(pind){
            // console.log(pind);
            $scope.post.options[pind].is_answer.push("");
        }
        $scope.queview=true;
        // $scope.queview=false;
        $scope.next=function(){
            $scope.queview=false;
        }
        $scope.prev=function(){
            $scope.queview=true;
           
        }

        quationsService.getParaById($stateParams.id).then(function(data) {
            console.log(data);
            $scope.post.solution =data.paragraph;
        });
        console.log($scope.post.solution);
       
    $scope.catList = [{ "id": 1, "name": "Radiotype1" }, { "id": 2, "name": "checkbox2" }, { "id": 3, "name": "input3" },{ "id": 4, "name": "Question type4(for paragraph)" }]

    if ($state.current.breadcrumb.text == 'Edit') {

        quationsService.getQueByid($stateParams.qid).then(function(data) {
            console.log(data[0]);
           // $scope.post.title=data[0].title;
           // $scope.post.quetion=data[0].quetion;
           $scope.post =  data[0];
           console.log($scope.post );
          
        });
    }
    $scope.add = function() {

        console.log($scope.post);
        var error = 0;
        if (error == 0) {
            // $scope.post.status = Number($scope.post.status);
            /// Inset values   
            quationsService.create($scope.post).then(function(data) {
                console.log(data);
                if (data[0].response == "success") {
                    $state.go('paragraph',{id1:$stateParams.id});
                    // 
                } else {
                    toastr.warning('Error : Not getting id !');
                }
            });
        }
    }
    $scope.edit = function() {
        var error = 0;
        if (error == 0) {
            console.log($scope.post);
            //  Update values 
            quationsService.updateQue($scope.post).then(function(data) {
                if (data[0].response == "success") {
                    $state.go('quations');
                } else {
                    toastr.warning('Error : Not getting coupons data by id !');
                }
            });
        }

    }
      $scope.onSubmit = function(form) {

        if ($state.current.breadcrumb.text == 'Edit') {
            $scope.edit(form)
        } else {
            $scope.add(form);
        }
    }
}]);
'use strict';

angular.module('inspinia').service('practisesubcategoryService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()

        $http.post(configurationService.baseUrl() + '/PractsubCategory/create_practsubcategory', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getsubcategoryList = function() {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/PractsubCategory/practsubcategory_all_list').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.getsubcategoryDetail = function(id) {
        var D = $q.defer();

        $http.get(configurationService.baseUrl() + '/Subcategory/subcategorydetail/' + id).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }


    this.deletesubcategory = function(id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/Subcategory/deleteproduct/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.updatesubcategory = function(data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/Subcategory/productUpdate', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
'use strict';

angular.module('inspinia')
    .controller('practisesubcategoryListCtrl', ["$scope", "$state", "$rootScope", "photogalleryService", "$cookieStore", "$stateParams", "$timeout", "practisesubcategoryService", function($scope, $state, $rootScope, photogalleryService, $cookieStore, $stateParams, $timeout, practisesubcategoryService) {
        var vm = this;

        if ($state.current.breadcrumb.text == "List") {
            $scope.regionList = [{}];
        }

        // console.log($stateParams.catId);
        vm.view = function(id) {
            // $state.go('customers.view', {
            //     id: id
            // });
        }

        $scope.list = function() {


            practisesubcategoryService.getsubcategoryList().then(function(data) {
                console.log(data);
                if (data) {

                    $scope.catList = data;
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                    console.log('Please Check Username And Password');
                }
            });


        }

        $scope.list();


        $scope.delete = function(id) {

            photogalleryService.deletegellery(id).then(function(data) {
                if (data.error.status == 200) {
                    //toaster.success('Item Successfully Deleted!');
                    $scope.list();
                } else {
                    console.log(data.error);
                    //toaster.warning('Unable to delete');
                }
            })
        }


    }]);
'use strict';

angular.module('inspinia').controller('practisesubcategoryCreateCtrl', ["$scope", "$state", "$rootScope", "practisecategoryService", "$stateParams", "FileUploader", "configurationService", "TestService", "$timeout", "practisesubcategoryService", "$filter", function($scope, $state, $rootScope,practisecategoryService,$stateParams, FileUploader, configurationService, TestService,$timeout ,practisesubcategoryService, $filter) {

// alert("enter in");
    $scope.post = {};
    //  $scope.post.status = 1001;

    // $scope.post.subcat = [{
    //     "titlelink": "",
    //     "youtube_uniqid": "",
    //     //"status": true
    // }];

    $scope.mainurl = configurationService.baseUrl();
    $scope.downUrl = configurationService.downUrl();

    //alltestList


    $scope.testList = function() {
        TestService.getTetstList($scope.login).then(function(data) {
           // console.log(data);
            if (data) {
                $scope.alltestList = data;
                $scope.alltestList.push({pra_trackid:"",name:"Please select test"});
                $scope.post.testidVal ="" ;
            } else {
                $scope.errorLogin = "Login failed! Please Check Username And Password";
                //console.log('Please Check Username And Password');
            }
        });
    }
    $scope.testList();

    $scope.catList = function() {


        practisecategoryService.getCategoryList($scope.login).then(function(data) {
            console.log(data);
            if (data) {

                $scope.allCatList = data;
                $scope.allCatList.push({trackid:"",title:"Please select Category"});
                $scope.post.catidVal ="" ;
            } else {
                $scope.errorLogin = "Login failed! Please Check Username And Password";
                console.log('Please Check Username And Password');
            }
        });


    }

    $scope.catList();

    // $scope.addOption = function() {

    //     // $scope.post.subcat.push({
    //     //     "titlelink": "",
    //     //     "youtube_uniqid": "",
           
    //     // });

    // }
    // $scope.removeOption = function(index) {
    //     if ($scope.post.subcat.length != 1) {
    //         $scope.post.subcat.splice(index, 1);
    //     }
    // }

    if ($state.current.breadcrumb.text == 'Edit') {
        // vediogalleryService.getproduct($stateParams.Id).then(function(data) {
        //     if (data.error == undefined) {


        //         vediogalleryService.getproductsubcat($scope.productsubcat).then(function(data) {
        //             if (data.error == undefined) {
        //                 console.log(data);

        //             } else {
        //                 toastr.warning('Error in User details!');
        //             }
        //         });

        //     } else {
        //         toastr.warning('Error in User details!');
        //     }
        // });
    }


    $scope.add = function() {

        var error = 0;
        if (error == 0) {

            /// Inset values   
            practisesubcategoryService.create($scope.post).then(function(data) {
                console.log(data[0].response);
                if (data[0].response == "success") {
                    console.log(data);
                    $state.go('practisesubcategory');
                } else {
                    toastr.warning('Error : Not getting Product data by id !');
                }
            });
        }
    }
    $scope.edit = function() {

        var error = 0;

        if (error == 0) {

            console.log($scope.model);
            //  Update values 
            vediogalleryService.updateproduct($scope.post, $stateParams.Id).then(function(data) {
                if (data.status == 200) {
                    $state.go('vediogallery');
                } else {
                    toastr.warning('Error : Not getting coupons data by id !');
                }
            });
        }

    }


    $scope.onSubmit = function(form) {

        if ($state.current.breadcrumb.text == 'Edit') {
            $scope.edit(form)
        } else {
            $scope.add(form);
        }
    }

    $timeout(function() { $scope.overlaystatus = true; }, 500);
    $scope.deleteimg = function(id) {
        $scope.imgobj.splice(id, 1);
    }





}]);
'use strict';

angular.module('inspinia').service('practiselessonService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()

        $http.post(configurationService.baseUrl() + '/PractLesson/create_practlesson', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
   
    this.getCategoryList = function() {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/PractLesson/practlesson_all_list').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    
  
    this.getRegionByCategory = function(id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/categories/' + id + '/regions').success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.updateRegion = function(data) {
        var D = $q.defer()
        $http.put(configurationService.baseUrl() + '/franchises', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
'use strict';

angular.module('inspinia')
    .controller('practiselessonListCtrl', ["$scope", "$state", "$rootScope", "photogalleryService", "$cookieStore", "$stateParams", "$timeout", "practiselessonService", function($scope, $state, $rootScope, photogalleryService, $cookieStore, $stateParams, $timeout,practiselessonService) {
        var vm = this;

        if ($state.current.breadcrumb.text == "List") {
            $scope.regionList = [{}];
        }

        // console.log($stateParams.catId);
        vm.view = function(id) {
            // $state.go('customers.view', {
            //     id: id
            // });
        }

        $scope.list = function() {


            practiselessonService.getCategoryList($scope.login).then(function(data) {
                console.log(data);
                if (data) {

                    $scope.catList = data;
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                    console.log('Please Check Username And Password');
                }
            });


        }

        $scope.list();


        $scope.delete = function(id) {

            practiselessonService.deletegellery(id).then(function(data) {
                if (data.error.status == 200) {
                    //toaster.success('Item Successfully Deleted!');
                    $scope.list();
                } else {
                    console.log(data.error);
                    //toaster.warning('Unable to delete');
                }
            })
        }


    }]);
'use strict';

angular.module('inspinia').controller('practiselessonCreateCtrl', ["$scope", "$state", "$rootScope", "$stateParams", "FileUploader", "configurationService", "TestService", "$timeout", "vediogalleryService", "practiselessonService", "$filter", function($scope, $state, $rootScope, $stateParams, FileUploader, configurationService, TestService,$timeout, vediogalleryService,practiselessonService, $filter) {

// alert("enter")
    $scope.post = {};
    //  $scope.post.status = 1001;

    // $scope.post.subcat = [{
    //     "titlelink": "",
    //     "youtube_uniqid": "",
    //     //"status": true
    // }];

    $scope.mainurl = configurationService.baseUrl();
    $scope.downUrl = configurationService.downUrl();
   
    //alltestList


    $scope.testList = function() {
        TestService.getTetstList($scope.login).then(function(data) {
           // console.log(data);
            if (data) {
                $scope.alltestList = data;
                $scope.alltestList.push({id:"",name:"Please select test"});
                $scope.post.testidVal ="" ;
                // $scope.post.lessontestidVal ="" ;
            } else {
                $scope.errorLogin = "Login failed! Please Check Username And Password";
                //console.log('Please Check Username And Password');
            }
        });
    }
    $scope.testList();
    // $scope.addOption = function() {

    //     // $scope.post.subcat.push({
    //     //     "titlelink": "",
    //     //     "youtube_uniqid": "",
           
    //     // });

    // }
    // $scope.removeOption = function(index) {
    //     if ($scope.post.subcat.length != 1) {
    //         $scope.post.subcat.splice(index, 1);
    //     }
    // }

    if ($state.current.breadcrumb.text == 'Edit') {
        // vediogalleryService.getproduct($stateParams.Id).then(function(data) {
        //     if (data.error == undefined) {


        //         vediogalleryService.getproductsubcat($scope.productsubcat).then(function(data) {
        //             if (data.error == undefined) {
        //                 console.log(data);

        //             } else {
        //                 toastr.warning('Error in User details!');
        //             }
        //         });

        //     } else {
        //         toastr.warning('Error in User details!');
        //     }
        // });
    }


    $scope.add = function() {

        var error = 0;
        if (error == 0) {

            /// Inset values   
            practiselessonService.create($scope.post).then(function(data) {
                console.log(data[0].response);
                if (data[0].response == "success") {
                    console.log(data);
                    $state.go('practiselesson');
                } else {
                    toastr.warning('Error : Not getting Product data by id !');
                }
            });
        }
    }
    $scope.edit = function() {

        var error = 0;

        if (error == 0) {

            console.log($scope.model);
            //  Update values 
            practiselessonService.updateproduct($scope.post, $stateParams.Id).then(function(data) {
                if (data.status == 200) {
                    $state.go('practisecategory');
                } else {
                    toastr.warning('Error : Not getting coupons data by id !');
                }
            });
        }

    }


    $scope.onSubmit = function(form) {

        if ($state.current.breadcrumb.text == 'Edit') {
            $scope.edit(form)
        } else {
            $scope.add(form);
        }
    }

    $timeout(function() { $scope.overlaystatus = true; }, 500);
    $scope.deleteimg = function(id) {
        $scope.imgobj.splice(id, 1);
    }





}]);
'use strict';

angular.module('inspinia').service('practisecategoryService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()

        $http.post(configurationService.baseUrl() + '/PractCategory/create_PractCategory', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
   
    this.update = function(data) {
        console.log(data);
        var D = $q.defer()

        $http.post(configurationService.baseUrl() + '/PractCategory/update_PractCategory', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
   
    this.getCategoryList = function() {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/PractCategory/practisecat_all_list').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    
  
    this.getPracticeById= function(id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/PractCategory/practisecat_by_id/' + id ).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.updateRegion = function(data) {
        var D = $q.defer()
        $http.put(configurationService.baseUrl() + '/franchises', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
'use strict';

angular.module('inspinia')
    .controller('practisecategoryListCtrl', ["$scope", "$state", "$rootScope", "photogalleryService", "$cookieStore", "$stateParams", "$timeout", "practisecategoryService", function($scope, $state, $rootScope, photogalleryService, $cookieStore, $stateParams, $timeout,practisecategoryService) {
        var vm = this;

        if ($state.current.breadcrumb.text == "List") {
            $scope.regionList = [{}];
        }

        // console.log($stateParams.catId);
        vm.view = function(id) {
            // $state.go('customers.view', {
            //     id: id
            // });
        }

        $scope.list = function() {


            practisecategoryService.getCategoryList($scope.login).then(function(data) {
                console.log(data);
                if (data) {

                    $scope.catList = data;
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                    console.log('Please Check Username And Password');
                }
            });


        }

        $scope.list();


        $scope.delete = function(id) {

            photogalleryService.deletegellery(id).then(function(data) {
                if (data.error.status == 200) {
                    //toaster.success('Item Successfully Deleted!');
                    $scope.list();
                } else {
                    console.log(data.error);
                    //toaster.warning('Unable to delete');
                }
            })
        }


    }]);
'use strict';

angular.module('inspinia').controller('practisecategoryCreateCtrl', ["$scope", "$state", "$rootScope", "$stateParams", "FileUploader", "configurationService", "TestService", "$timeout", "vediogalleryService", "practisecategoryService", "$filter", "quationsService", function($scope, $state, $rootScope, $stateParams, FileUploader, configurationService, TestService,$timeout, vediogalleryService,practisecategoryService, $filter,quationsService) {

// alert("enter")
    $scope.post = {"questionidsVal":[]};
    $scope.post.lessonidVal="" ;
    $scope.post.questiontypeVal="" ;
    $scope.categories = [{ name: "Verbal" ,id: "verbal" }, { name: "Math", id: "math" },{ name: "awa", id: "awa" },{ name: "Quant", id: "Quant" }];
    $scope.getQuaId = function(qua) {
        console.log(qua.trackid) ;
        var getIndex = _.findIndex($scope.post.questionidsVal, function(o) {
            return o === qua.trackid;
        });
        if (getIndex != -1) {
            $scope.post.questionidsVal.splice(getIndex, 1);
            var getIndex1 = _.findIndex($scope.quetionsList, function(o) {
                return o.trackid === qua.trackid;
            });
            $scope.quetionsList.splice(getIndex1, 1) ; 
        } else {
            console.log( $scope.post.questionidsVal);
            //Number(qua.trackid )
          $scope.post.questionidsVal.push(qua.trackid);
          $scope.quetionsList.push(qua) ;   
        }
    }
    $scope.deleteQua=function(id,index){
        $scope.post.questionidsVal.splice(index, 1);
        $scope.quetionsList.splice(index, 1) ; 
    }
    $scope.quaData = [];
    $scope.post.catVal= 'Quant' ;
    $scope.changeCategory=function(){
    $scope.quaData = [];
        if($scope.post.catVal){
            TestService.getQuationstCatByNameList($scope.post.catVal).then(function(data) {
                console.log(data);
                if (data) {
                    $scope.quaData = data;
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                    console.log('Please Check Username And Password');
                }
            });
        }
    }
  //$scope.changeCategory();
// end dropdown
// input
 $scope.quaData = [];
 $scope.post.catVal1= '' ;
 $scope.changeCategory1=function(){
 $scope.quaData = [];
        if($scope.post.catVal1){
            TestService.getQuationstCatByNameList1($scope.post.catVal1).then(function(data) {
                console.log(data);
                if (data) {
                    $scope.quaData = data;
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                    console.log('Please Check Username And Password');
                }
            });
        }
}
$scope.changeCategory1();
// end input
    $scope.post.questionidsVal = [] ;
    $scope.post.statusVal = 1001 ;
    $scope.mainurl = configurationService.baseUrl();
    $scope.downUrl = configurationService.downUrl();
    $scope.catList = [{ "id": "Maths", "name": "Maths" }, { "id": "Verbal", "name": "Verbal" }];
    $scope.lessonList = [
     {"id": "Number Systems", "name": "Number Systems" }
    ,{"id": "Integer Properties", "name": "Integer Properties" }
    ,{"id": "Percentages", "name": "Percentages" }
    ,{"id": "Ratios and fractions", "name": "Ratios and fractions" }
    ,{"id": "Algebra", "name": "Algebra" }
    ,{"id": "Word problems", "name": "Word problems" }
    ,{"id": "Angles and triangles", "name": "Angles and triangles" }
    ,{"id": "Quadrilaterals and circles", "name": "Quadrilaterals and circles" }
    ,{"id": "3D Geometry", "name": "3D Geometry" }
    ,{"id": "Coordinate geometry", "name": "Coordinate geometry" }
    ,{"id": "Statistics", "name": "Statistics" }
    ,{"id": "Data Interpretation", "name": "Data Interpretation" }
    ,{"id": "Permutations and combinations", "name": "Permutations and combinations" }
    ,{"id": "Probability", "name": "Probability" }
    ];
    $scope.questionTypeList = [
             {"id": "Quantitative Comparision", "name": "Quantitative Comparision" }
            ,{"id": "Data Interpretation", "name": "Data Interpretation" }
            ,{"id": "Problem Solving-Single Answer", "name": "Problem Solving-Single Answer" }
            ,{"id": "Problem Solving-multiple Answer", "name": "Problem Solving-multiple Answer"}
            ,{"id": "Problem Solving-Numeric Entry", "name": "Problem Solving-Numeric Entry" }
            ,{"id": "Text Completion-single Answer", "name": "Text Completion-single Answer" }
            ,{"id": "Text Completion-Double Answer", "name": "Text Completion-Double Answer" }
            ,{"id": "Text Completion-Triple Answer", "name": "Text Completion-Triple Answer" }
            ,{"id": "Sentence Equivalence", "name": "Sentence Equivalence" }
            ,{"id": "Reading Comprehension-Short", "name": "Reading Comprehension-Short" }
            ,{"id": "Reading Comprehension-Long", "name": "Reading Comprehension-Long" }
            ,{"id": "Critical Reasoning", "name": "Critical Reasoning" }
            ];
    
    
    //alltestList

    $scope.testList = function() {
        TestService.getTetstList($scope.login).then(function(data) {
           // console.log(data);
            if (data) {
                $scope.alltestList = data;
                $scope.alltestList.push({id:"",name:"Please select test"});
               
                // $scope.post.lessontestidVal ="" ;
            } else {
                $scope.errorLogin = "Login failed! Please Check Username And Password";
                //console.log('Please Check Username And Password');
            }
        });
    }
    $scope.testList();
    // $scope.addOption = function() {

    //     // $scope.post.subcat.push({
    //     //     "titlelink": "",
    //     //     "youtube_uniqid": "",
           
    //     // });

    // }
    // $scope.removeOption = function(index) {
    //     if ($scope.post.subcat.length != 1) {
    //         $scope.post.subcat.splice(index, 1);
    //     }
    // }

    if ($state.current.breadcrumb.text == 'Edit') {
        practisecategoryService.getPracticeById($stateParams.id).then(function(data) {
            if (data.error == undefined) {
                $scope.post.id = data.id;
                $scope.post.questionidsVal = [] ;
                $scope.post.categoryidVal = data.categoryid ;
                $scope.post.lessonidVal = data.lessonid ;
              //  $scope.post.questionidsVal =JSON.parse(data.questionids );   
                $scope.post.questionidsVal =data.questionids ;                
                $scope.post.questiontypeVal=data.questiontype ;
                $scope.quetionsList =data.quation_ids ;
                console.log(data.quation_ids);
                 
            } else {
                toastr.warning('Error in  details!');
            }
        });
    }
    $scope.add = function() {
        var error = 0;
        if (error == 0) {
            console.log($scope.post);
            /// Inset values   
            practisecategoryService.create($scope.post).then(function(data) {
                console.log(data[0].response);
                if (data[0].response == "success") {
                    console.log(data);
                    $state.go('practisecategory');
                } else {
                    toastr.warning('Error : Not getting Product data by id !');
                }
            });
        }
    }
    $scope.edit = function() {
        var error = 0;
        if (error == 0) {
            //  Update values 
            console.log($scope.post);
            practisecategoryService.update($scope.post).then(function(data) {
                console.log(data[0].response);
                if (data[0].response == "success") {
                    console.log(data);
                    $state.go('practisecategory');
                } else {
                    toastr.warning('Error : Not getting Product data by id !');
                }
            });
        }
    }
    $scope.onSubmit = function(form) {
        if ($state.current.breadcrumb.text == 'Edit') {
            $scope.edit(form)
        } else {
            $scope.add(form);
        }
    }
    $timeout(function() { $scope.overlaystatus = true; }, 500);
    $scope.deleteimg = function(id) {
        $scope.imgobj.splice(id, 1);
    }
}]);
'use strict';

angular.module('inspinia').service('photogalleryService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()

        $http.post(configurationService.baseUrl() + '/Gallery/add', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getCategoryList = function() {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Gallery/list').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.deletegellery = function(id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/Gallery/deletegallery/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }


    this.updateRegion = function(data) {
        var D = $q.defer()
        $http.put(configurationService.baseUrl() + '/franchises', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
'use strict';

angular.module('inspinia')
    .controller('photogalleryListCtrl', ["$scope", "$state", "$rootScope", "$cookieStore", "$stateParams", "$timeout", "photogalleryService", function($scope, $state, $rootScope, $cookieStore, $stateParams, $timeout, photogalleryService) {
        var vm = this;

        if ($state.current.breadcrumb.text == "List") {
            $scope.regionList = [{}];
        }

        // console.log($stateParams.catId);
        vm.view = function(id) {
            // $state.go('customers.view', {
            //     id: id
            // });
        }

        $scope.list = function() {


            photogalleryService.getCategoryList($scope.login).then(function(data) {
                console.log(data);
                if (data) {

                    $scope.catList = data;
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                    console.log('Please Check Username And Password');
                }
            });


        }

        $scope.list();

        $scope.delete = function(id) {

            photogalleryService.deletegellery(id).then(function(data) {
                if (data.error.status == 200) {
                    //toaster.success('Item Successfully Deleted!');
                    $scope.list();
                } else {
                    console.log(data.error);
                    //toaster.warning('Unable to delete');
                }
            })
        }

    }]);
'use strict';

angular.module('inspinia').controller('photogalleryCreateCtrl', ["$scope", "$state", "$rootScope", "$stateParams", "FileUploader", "configurationService", "$timeout", "photogalleryService", "$filter", function($scope, $state, $rootScope, $stateParams, FileUploader, configurationService, $timeout, photogalleryService, $filter) {




    $scope.post = {};
    $scope.post.status = 1001;
    $scope.post.cat = 1;
    $scope.post.path = "";
    $scope.post.link = "";
    $scope.category1=[{"id":"audio","name":"Audio"},{"id":"image","name":"Image"}]
    $scope.mainurl = configurationService.baseUrl();
    $scope.downUrl = configurationService.downUrl();

    // Variant category end
    var userUrl = $scope.userUrl = new FileUploader({
        scope: $scope,
        url: $scope.mainurl + '/images/upload',
        formData: [
            { key: 'value' }
        ]
    });

    userUrl.onSuccessItem = function(item, response, status, headers) {
        console.log(response);
        $scope.errorimg = '';
        $scope.img = response;

        var imageURL = '/uploads/' + response.path;
        $scope.post.path = imageURL;
        console.log($scope.post.path);

    };

    if ($state.current.breadcrumb.text == 'Edit') {
        // photogalleryService.getproduct($stateParams.Id).then(function(data) {
        //     if (data.error == undefined) {


        //         photogalleryService.getproductsubcat($scope.productsubcat).then(function(data) {
        //             if (data.error == undefined) {
        //                 console.log(data);

        //             } else {
        //                 toastr.warning('Error in User details!');
        //             }
        //         });

        //     } else {
        //         toastr.warning('Error in User details!');
        //     }
        // });
    }


    $scope.add = function() {

        var error = 0;
        if (error == 0) {

            /// Inset values   

            photogalleryService.create($scope.post).then(function(data) {
                console.log(data);
                if (data.error.status == 200) {
                    $state.go('photogallery');
                } else {
                    toastr.warning('Error : Not getting Product data by id !');
                }
            });
        }
    }
    $scope.edit = function() {

        var error = 0;

        if (error == 0) {

            console.log($scope.model);
            //  Update values 
            photogalleryService.updateproduct($scope.post, $stateParams.Id).then(function(data) {
                if (data.status == 200) {
                    $state.go('product');
                } else {
                    toastr.warning('Error : Not getting coupons data by id !');
                }
            });
        }

    }


    $scope.onSubmit = function(form) {

        if ($state.current.breadcrumb.text == 'Edit') {
            $scope.edit(form)
        } else {
            $scope.add(form);
        }
    }

    $timeout(function() { $scope.overlaystatus = true; }, 500);
    $scope.deleteimg = function(id) {
        $scope.imgobj.splice(id, 1);
    }





}]);
'use strict';

angular.module('inspinia').service('paragraphService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()
        // http://localhost/ieltsservices/ielts/api/Pragoption/create_paragraph
        $http.post(configurationService.baseUrl() + '/Pragoption/create_paragraph', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getParatList = function() {
        var D = $q.defer();
        var data = {};
      
        $http.get(configurationService.baseUrl() + '/Pragoption/list_paragraph').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.getQuationstCatByNameList = function(name) {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Queoption/categoryget_by_cat/'+name).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }


    this.getProductDetail = function(id) {
        var D = $q.defer();
        $http.get(configurationService.baseUrl() + '/category/productdetail/' + id).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    

    this.deleteProduct = function(id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/Queoption/quotion/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.updateproduct = function(data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/category/productUpdate', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
'use strict';

angular.module('inspinia')
    .controller('paragraphListCtrl', ["$scope", "$state", "$rootScope", "paragraphService", "$cookieStore", "$stateParams", "$timeout", "quationsService", function($scope, $state, $rootScope, paragraphService,$cookieStore, $stateParams, $timeout, quationsService) {
        var vm = this;
        $scope.post={} ;
        $scope.categories = [{ name: "Verbal" ,id: "verbal" }, { name: "Math", id: "math" },{ name: "awa", id: "awa" },{ name: "Quant", id: "quant" }];
        if ($state.current.breadcrumb.text == "List") {
            $scope.regionList = [{}];
        }

        // console.log($stateParams.catId);
        vm.view = function(id) {
            // $state.go('customers.view', {
            //     id: id
            // });
        }
        $scope.quaList =[] ;
     
        $scope.list = function() {
            paragraphService.getParatList($scope.login).then(function(data) {
                console.log(data);
                if (data) {
                    $scope.quaList = data;
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                    console.log('Please Check Username And Password');
                }
            });
        }
        $scope.list();
        $scope.quecreate=function(paratrackid){
           $state.go('quations.create',{'id':paratrackid});
        }
        $scope.quelist=function(paratrackid){
            $state.go('quations',{'id':paratrackid});
          }

        $scope.edit = function(parmid) {
            $state.go('products.edit', { id: parmid });
        }
        $scope.delete = function(id) {
            quationsService.deleteProduct(id).then(function(data) {
                if (data.error.status == 200) {
                    //  toaster.success('product Successfully Deleted!');
                    $scope.list();
                } else {
                    console.log(data.error);
                    toaster.warning('Unable to delete');
                }
            })
        }

    }]);
'use strict';

angular.module('inspinia').controller('paragraphCreateCtrl', ["$scope", "photogalleryService", "paragraphService", "$state", "$rootScope", "$stateParams", "FileUploader", "configurationService", "$timeout", "quationsService", "categoryService", "$filter", function($scope, photogalleryService,paragraphService, $state, $rootScope, $stateParams, FileUploader, configurationService, $timeout, quationsService, categoryService, $filter) {


    // $scope.noOfBlanks = [{ name: 1, id: 1 },{ name: 2, id: 2 }, { name: 3, id: 3 }];

    //  $scope.categories = [{ name: "Verbal" ,id: "1" }, { name: "Math", id: "2" },{ name: "Awa", id: "3" },{ name: "Quant", id: "4" }];
    $scope.post={};
    $scope.post.type=0;
    $scope.post.f1=0;
    $scope.contentType=[{"name":"Reading","id":"reading"},{"name":"Listening","id":"listening"},{"name":"Writing","id":"writing"}];
    $scope.post.f2="reading";
    $scope.post.f3="";
    $scope.post.f4="";
    
    
    $scope.mainurl = configurationService.baseUrl();
    $scope.downUrl = configurationService.downUrl();

    // Variant category end
    var userUrl = $scope.userUrl = new FileUploader({
        scope: $scope,
        url: $scope.mainurl + '/images/upload',
        formData: [
            { key: 'value' }
        ]
    });

    userUrl.onSuccessItem = function(item, response, status, headers) {
        console.log(response);
        $scope.errorimg = '';
        $scope.img = response;

        var imageURL = '/uploads/' + response.path;
        $scope.post.paragraph = imageURL;
        console.log($scope.post.f2);

    };
    $scope.deleteimg = function(id) {
      //  $scope.imgobj.splice(id, 1);
      $scope.post.paragraph = "";
    }
    $scope.list = function() {
        photogalleryService.getCategoryList().then(function(data) {
            console.log(data);
            if (data) {

                $scope.galleryList = data;
                console.log($scope.galleryList);
                $scope.galleryList.push({path:"",name:"Select AudioFile"});
            } else {
                $scope.errorLogin = "Login failed! Please Check Username And Password";
                console.log('Please Check Username And Password');
            }
        });
    }

    $scope.list();

    $scope.changeType=function(){
        $scope.post.paragraph = "";
    }

    $scope.gallerylist = function() {
        photogalleryService.getCategoryList($scope.login).then(function(data) {
            console.log(data);
            if (data) {
                $scope.galleryData = data;

            } else {
                $scope.errorLogin = "Login failed! Please Check Username And Password";
                console.log('Please Check Username And Password');
            }
        });
    }
    $scope.gallerylist();
    // $scope.post = { "trackid": "", "name": "", "noblk": 0 ,"paragraph":""};
    // $scope.post.status = 1001;


  
    $scope.mainurl = configurationService.baseUrl();
    $scope.downUrl = configurationService.downUrl();

 
    $scope.catList = [{ "id": 1, "name": "Radio type1" }, { "id": 2, "name": "checkbox type2" }, { "id": 3, "name": "Question type3(for blanks)" },{ "id": 4, "name": "Question type4(for paragraph)" },{ "id": 5, "name": "Question type5(input box)" },{ "id": 6, "name": "Question Type6(for select sentance)" },{ "id": 7, "name": "Question Type7(for writing passage)" }]

    if ($state.current.breadcrumb.text == 'Edit') {

        quationsService.getProductDetail($stateParams.id).then(function(data) {
            if (data.error.status == 200) {
                $scope.post = data.error.data;
                $scope.post.status = Number($scope.post.status);
                $scope.showimage = true;
                console.log(data.error.data);
            } else {
                toastr.warning('Error in User details!');
            }
        });
    }


    $scope.add = function() {

        var error = 0;
        if (error == 0) {
            // $scope.post.status = Number($scope.post.status);
            /// Inset values   
            paragraphService.create($scope.post).then(function(data) {
                console.log(data);
                if (data[0].response == "success") {
                    $state.go('quations.create',{'id':data[0].trackid});
                } else {
                    toastr.warning('Error : Not getting id !');
                }
            });
        }
    }
    $scope.edit = function() {
        var error = 0;
        if (error == 0) {
            console.log($scope.post);
            //  Update values 
            quationsService.updateproduct($scope.post).then(function(data) {
                if (data[0].response == "success") {
                    $state.go('quations');
                } else {
                    toastr.warning('Error : Not getting coupons data by id !');
                }
            });
        }

    }


    $scope.onSubmit = function(form) {

        if ($state.current.breadcrumb.text == 'Edit') {
            $scope.edit(form)
        } else {
            $scope.add(form);
        }
    }

    $timeout(function() { $scope.overlaystatus = true; }, 500);
    $scope.deleteimg = function(id) {
        //$scope.post.images.splice(id, 1);

        $scope.post.thumb = "";
        $scope.showimage = false;
    }





}]);
'use strict';

angular.module('inspinia')
  .controller('MainCtrl', ["$scope", function ($scope) {

    this.userName = 'Example user';
    this.helloText = 'Welcome in INSPINIA Gulp SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects.';

  }]);

'use strict';

angular.module('inspinia')
    .controller('logoutCtrl', ["$scope", "loginService", "$state", "$rootScope", "$cookieStore", function($scope, loginService, $state, $rootScope, $cookieStore) {
        $cookieStore.remove('loginAccess');
        $state.go('login');
        $scope.hideView = true; 
    }]);

'use strict';

angular.module('inspinia')
    .controller('loginCtrl', ["$scope", "loginService", "$state", "$rootScope", "$cookieStore", function($scope, loginService, $state, $rootScope, $cookieStore) {

        $scope.errorLogin = "";
        if ($cookieStore.get('loginAccess') == undefined) {
            $rootScope.hideView = true;
        } else {
            $rootScope.hideView = false;
        }

        $scope.login = {};
        $scope.onSubmit = function() {
            $scope.errorLogin = "";

            loginService.getLogin($scope.login).then(function(data) {

                if (data.error == undefined) {
                    $rootScope.hideView = false;
                    $cookieStore.put("loginAccess", data);
                    
                    $state.go('users');
                    // toaster.success('Welcome To Dashboard');
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                    console.log('Please Check Username And Password');
                }
            });
        };
    }]);
'use strict';

angular.module('inspinia').service('loginService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {



    this.getLogin = function(data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/Admin/Login/', data).success(function(data) {
                D.resolve(data);
            })
            .error(function(data) {
                D.resolve(data);
            });
        return D.promise;
    }


}]);
'use strict';

angular.module('inspinia')
    .controller('feedbackListCtrl', ["$scope", "$state", "$rootScope", "$cookieStore", "$stateParams", "$timeout", "feedbackService", function($scope, $state, $rootScope, $cookieStore, $stateParams, $timeout, feedbackService) {
        var vm = this;

        if ($state.current.breadcrumb.text == "List") {
            $scope.regionList = [{}];
        }

        // console.log($stateParams.catId);
        vm.view = function(id) {
            // $state.go('customers.view', {
            //     id: id
            // });
        }

        $scope.list = function() {


            feedbackService.getsubcategoryList().then(function(data) {
                console.log(data);
                if (data) {

                    $scope.catList = data;
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                    console.log('Please Check Username And Password');
                }
            });


        }

        $scope.list();


        $scope.delete = function(id) {

            photogalleryService.deletegellery(id).then(function(data) {
                if (data.error.status == 200) {
                    //toaster.success('Item Successfully Deleted!');
                    $scope.list();
                } else {
                    console.log(data.error);
                    //toaster.warning('Unable to delete');
                }
            })
        }


    }]);
'use strict';

angular.module('inspinia').service('feedbackService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()

        $http.post(configurationService.baseUrl() + '/Subcategory/create_subcategory', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getsubcategoryList = function() {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/Feedback/feedback_all_list').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.getsubcategoryDetail = function(id) {
        var D = $q.defer();

        $http.get(configurationService.baseUrl() + '/Subcategory/subcategorydetail/' + id).success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }


    this.deletesubcategory = function(id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/Subcategory/deleteproduct/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.updatesubcategory = function(data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/Subcategory/productUpdate', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
'use strict';

angular.module('inspinia').controller('subcategoryCreateCtrl', ["$scope", "$state", "$rootScope", "vediogalleryService", "$stateParams", "FileUploader", "configurationService", "TestService", "$timeout", "subcategoryService", "$filter", function($scope, $state, $rootScope,vediogalleryService,$stateParams, FileUploader, configurationService, TestService,$timeout ,subcategoryService, $filter) {


    $scope.post = {};
    //  $scope.post.status = 1001;

    // $scope.post.subcat = [{
    //     "titlelink": "",
    //     "youtube_uniqid": "",
    //     //"status": true
    // }];

    $scope.mainurl = configurationService.baseUrl();
    $scope.downUrl = configurationService.downUrl();

    //alltestList


    $scope.testList = function() {
        TestService.getTetstList($scope.login).then(function(data) {
           // console.log(data);
            if (data) {
                $scope.alltestList = data;
                $scope.alltestList.push({id:"",name:"Please select test"});
                $scope.post.testidVal ="" ;
            } else {
                $scope.errorLogin = "Login failed! Please Check Username And Password";
                //console.log('Please Check Username And Password');
            }
        });
    }
    $scope.testList();

    $scope.catList = function() {


        vediogalleryService.getCategoryList($scope.login).then(function(data) {
            console.log(data);
            if (data) {

                $scope.allCatList = data;
                $scope.allCatList.push({trackid:"",title:"Please select Category"});
                $scope.post.catidVal ="" ;
            } else {
                $scope.errorLogin = "Login failed! Please Check Username And Password";
                console.log('Please Check Username And Password');
            }
        });


    }

    $scope.catList();

    // $scope.addOption = function() {

    //     // $scope.post.subcat.push({
    //     //     "titlelink": "",
    //     //     "youtube_uniqid": "",
           
    //     // });

    // }
    // $scope.removeOption = function(index) {
    //     if ($scope.post.subcat.length != 1) {
    //         $scope.post.subcat.splice(index, 1);
    //     }
    // }

    if ($state.current.breadcrumb.text == 'Edit') {
        // vediogalleryService.getproduct($stateParams.Id).then(function(data) {
        //     if (data.error == undefined) {


        //         vediogalleryService.getproductsubcat($scope.productsubcat).then(function(data) {
        //             if (data.error == undefined) {
        //                 console.log(data);

        //             } else {
        //                 toastr.warning('Error in User details!');
        //             }
        //         });

        //     } else {
        //         toastr.warning('Error in User details!');
        //     }
        // });
    }


    $scope.add = function() {

        var error = 0;
        if (error == 0) {

            /// Inset values   
            subcategoryService.create($scope.post).then(function(data) {
                console.log(data[0].response);
                if (data[0].response == "success") {
                    console.log(data);
                    $state.go('subcategory');
                } else {
                    toastr.warning('Error : Not getting Product data by id !');
                }
            });
        }
    }
    $scope.edit = function() {

        var error = 0;

        if (error == 0) {

            console.log($scope.model);
            //  Update values 
            vediogalleryService.updateproduct($scope.post, $stateParams.Id).then(function(data) {
                if (data.status == 200) {
                    $state.go('vediogallery');
                } else {
                    toastr.warning('Error : Not getting coupons data by id !');
                }
            });
        }

    }


    $scope.onSubmit = function(form) {

        if ($state.current.breadcrumb.text == 'Edit') {
            $scope.edit(form)
        } else {
            $scope.add(form);
        }
    }

    $timeout(function() { $scope.overlaystatus = true; }, 500);
    $scope.deleteimg = function(id) {
        $scope.imgobj.splice(id, 1);
    }





}]);
'use strict';

angular.module('inspinia')
    .controller('categoryListCtrl', ["$scope", "$state", "$rootScope", "$cookieStore", "$stateParams", "$timeout", "categoryService", function($scope, $state, $rootScope, $cookieStore, $stateParams, $timeout, categoryService) {
        var vm = this;

        if ($state.current.breadcrumb.text == "List") {
            $scope.regionList = [{}];
        }

        // console.log($stateParams.catId);
        vm.view = function(id) {
            // $state.go('customers.view', {
            //     id: id
            // });
        }

        $scope.list = function() {


            categoryService.getCategoryList($scope.login).then(function(data) {
                console.log(data);
                if (data) {

                    $scope.catList = data;
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                    console.log('Please Check Username And Password');
                }
            });


        }

        $scope.list();


    }]);
// $scope.delete = function(id) {
//     regionService.delete(id).then(function(data) {
//         if (data.count == 1) {
//             toaster.success('User Successfully Deleted!');
//             regionService.listRegions().then(function(data) {
//                 $scope.regionList.list = data;
//                 $state.go('regions');
//             })
//         } else {
//             console.log(data.error);
//             toaster.warning('Unable to delete');
//         }
//     })
// }
'use strict';

angular.module('inspinia').controller('RegionCreateCtrl', ["$scope", "$state", "$rootScope", "$stateParams", "FileUploader", "configurationService", "$timeout", "categoryService", "$filter", function($scope, $state, $rootScope, $stateParams, FileUploader, configurationService, $timeout, categoryService, $filter) {


    $scope.post = {};
    $scope.post.status = 1001;
    $scope.post.catid = 0;
    $scope.post.level = 0;
    $scope.post.thumb = "";
    $scope.post.shortdis = "";
    $scope.post.des = "";
    $scope.post.seo_title = "";
    $scope.post.seo_keywords = "";
    $scope.post.seo_desc = "";
    $scope.post.uri = "";


    // Variant category end

    if ($state.current.breadcrumb.text == 'Edit') {
        // categoryService.getproduct($stateParams.Id).then(function(data) {
        //     if (data.error == undefined) {


        //         categoryService.getproductsubcat($scope.productsubcat).then(function(data) {
        //             if (data.error == undefined) {
        //                 console.log(data);

        //             } else {
        //                 toastr.warning('Error in User details!');
        //             }
        //         });

        //     } else {
        //         toastr.warning('Error in User details!');
        //     }
        // });
    }


    $scope.add = function() {

        var error = 0;
        if (error == 0) {

            /// Inset values   
            categoryService.create($scope.post).then(function(data) {
                console.log(data);
                if (data.error.status == 200) {
                    $state.go('category');
                } else {
                    //  toastr.warning('Error : Not getting Product data by id !');
                    alert('Error : Not getting Product data by id !');
                }
            });
        }
    }
    $scope.edit = function() {

        var error = 0;

        if (error == 0) {

            console.log($scope.model);
            //  Update values 
            categoryService.updateproduct($scope.post, $stateParams.Id).then(function(data) {
                if (data.status == 200) {
                    $state.go('product');
                } else {
                    //toastr.warning('Error : Not getting coupons data by id !');
                    alert('Error : Not getting coupons data by id !');
                }
            });
        }

    }


    $scope.onSubmit = function(form) {

        if ($state.current.breadcrumb.text == 'Edit') {
            $scope.edit(form)
        } else {
            $scope.add(form);
        }
    }

    $timeout(function() { $scope.overlaystatus = true; }, 500);
    $scope.deleteimg = function(id) {
        $scope.imgobj.splice(id, 1);
    }





}]);
'use strict';

angular.module('inspinia').service('categoryService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject

    this.create = function(data) {
        console.log(data);
        var D = $q.defer()

        $http.post(configurationService.baseUrl() + '/category/add', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getCategoryList = function() {
        var D = $q.defer();
        var data = {};
        $http.get(configurationService.baseUrl() + '/category/list').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.listRegions = function() {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/franchises').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.deleteRegion = function(id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/franchises/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getRegion = function(id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/franchises/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getAllRegion = function() {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/franchises/').success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.getRegionByCategory = function(id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/categories/' + id + '/regions').success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.updateRegion = function(data) {
        var D = $q.defer()
        $http.put(configurationService.baseUrl() + '/franchises', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
/**
 * INSPINIA - Responsive Admin Theme
 * 2.3
 *
 * Custom scripts
 */

$(document).ready(function () {


  // Full height
  function fix_height() {
    var heightWithoutNavbar = $("body > #wrapper").height() - 61;
    $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

    var navbarHeigh = $('nav.navbar-default').height();
    var wrapperHeigh = $('#page-wrapper').height();

    if (navbarHeigh > wrapperHeigh) {
      $('#page-wrapper').css("min-height", navbarHeigh + "px");
    }

    if (navbarHeigh < wrapperHeigh) {
      $('#page-wrapper').css("min-height", $(window).height() + "px");
    }

    if ($('body').hasClass('fixed-nav')) {
      if (navbarHeigh > wrapperHeigh) {
        $('#page-wrapper').css("min-height", navbarHeigh - 60 + "px");
      } else {
        $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
      }
    }
  }

  $(window).bind("load resize scroll", function () {
    if (!$("body").hasClass('body-small')) {
      fix_height();
    }
  })

  setTimeout(function () {
    fix_height();
  })
});

// Minimalize menu when screen is less than 768px
$(function () {
  $(window).bind("load resize", function () {
    if ($(this).width() < 769) {
      $('body').addClass('body-small')
    } else {
      $('body').removeClass('body-small')
    }
  })
});

'use strict';

//Directive used to set metisMenu and minimalize button
angular.module('inspinia')
    .filter('getStatus', function() {
        return function(input) {
            var result;
            switch (input) {
                case 1001:
                    return result = "Active";

                case 1002:
                    return result = "In Active";


            }

        };

    })

.filter('isactive', function() {
    return function(input) {
        var result;
        switch (input) {
            case 1001:
                return result = "fa-check";

            case 1002:
                return result = "fa-times";


        }

    };

})

.filter('getUserStatus', function() {

    return function(input) {
        var result;
        switch (Number(input)) {
            case 1001:
                return result = "Active";

            case 1009:
                return result = "Inactive";

        }

    };
})

.filter('sumbykey', function() {
    return function(data, key) {
        if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
            return 0;
        }

        var sum = 0.00;
        for (var i = data.length - 1; i >= 0; i--) {
            sum += parseFloat(data[i][key]);
        }

        return sum;
    };

})



.filter('AppaintmentStatus', function() {
    return function(input) {
        var result;
        switch (input) {
            case 1001:
                return result = "New Appointment";
            case 1002:
                return result = "Assigned";
            case 1003:
                return result = "Completed";
            case 1004:
                return result = "Cancelled";
            case 1005:
                return result = "Dispatched";
            case 1006:
                return result = "Delivered";



        }

    };

})


.filter('appaintmentMsg', function() {
    return function(input) {
        var result;
        switch (input) {
            case 1001:
                return result = "Successfully New Appointment";
            case 1002:
                return result = "Successfully Assigned";
            case 1003:
                return result = "Successfully Completed";
            case 1004:
                return result = "Successfully Cancelled";
            case 1005:
                return result = "Successfully Dispatched";
            case 1006:
                return result = "Successfully Delivered";



        }

    };

})





.filter('OrderStatus', function() {
    return function(input) {
        var result;
        switch (input) {
            case 1001:
                return result = "New Order";
            case 1002:
                return result = "Assigned";
            case 1003:
                return result = "Completed";
            case 1004:
                return result = "Cancelled";
            case 1005:
                return result = "Dispatched";
            case 1006:
                return result = "Delivered";


        }

    };

})


.filter('OrderMsg', function() {
    return function(input) {
        var result;
        switch (input) {
            case 1001:
                return result = "Successfully New Order Created";
            case 1002:
                return result = "Your order Assigned";

            case 1003:
                return result = "Your order Completed";
            case 1004:
                return result = "Your order Cancelled";



        }

    };

})

.filter('currentpage', function() {
    return function(input) {

        if (input == 0) {
            return 1;
        } else {
            var div = input / 10;
            return div;
        }
    };
})

.filter('currentpage1', function() {
    return function(input) {

        if (input == 0) {
            return 1;
        } else {
            var div = input / 10;
            return div + 1;
        }
    };
})

.directive('listView', ["$timeout", "$parse", function($timeout, $parse) {
        //console.log($parse);
        return {
            restrict: 'E',
            templateUrl: function(elem, attr) {
                return 'components/common/directives/' + attr.type + '.html';
            },
            controller: 'directiveList'
                //templateUrl:'components/common/directives/list-directive.html',   

        };
    }])
    .filter('currentpages', function() {
        return function(input) {

            if (input == 0) {
                return 1;
            } else {
                var div = input / 10;
                return div;
            }
        };
    })

.filter('currentpage2', function() {
    return function(input) {

        if (input == 0) {
            return 1;
        } else {
            var div = input / 10;
            return div + 1;
        }
    };
})


.directive('listViews', ["$timeout", "$parse", function($timeout, $parse) {
    //console.log($parse);
    return {
        restrict: 'E',
        templateUrl: function(elem, attr) {
            return 'components/common/directives/' + attr.type + '.html';
        },
        controller: 'directiveList1'
            //templateUrl:'components/common/directives/list-directive.html',   
    };
}])

.directive('listViews2', ["$timeout", "$parse", function($timeout, $parse) {
    //console.log($parse);
    return {
        restrict: 'E',
        templateUrl: function(elem, attr) {
            return 'components/common/directives/' + attr.type + '.html';
        },
        controller: 'directiveList2'
            //templateUrl:'components/common/directives/list-directive.html',   
    };
}])

.filter('getType', function() {
        return function(input) {
            var result;
            switch (input) {
                case 1001:
                    return result = "Pickup and Drop";
                case 1002:
                    return result = "Purchase";
            }

        };

    })
    .directive('sideNavigation', ["$timeout", function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                // Call metsi to build when user signup
                scope.$watch('authentication.user', function() {
                    $timeout(function() {
                        element.metisMenu();
                    });
                });

            }
        };
    }])
    .directive('googleplace', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, model) {
                var options = {
                    types: [],
                    componentRestrictions: { country: 'in' }
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                    scope.$apply(function() {
                        model.$setViewValue(element.val());
                    });
                });
            }
        };
    })

.constant('uiDatetimePickerConfig', {
    dateFormat: 'yyyy-MM-dd HH:mm',
    defaultTime: '00:00:00',
    html5Types: {
        date: 'yyyy-MM-dd',
        'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
        'month': 'yyyy-MM'
    },
    initialPicker: 'date',
    reOpenDefault: false,
    enableDate: true,
    enableTime: true,
    buttonBar: {
        show: true,
        now: {
            show: true,
            text: 'Now'
        },
        today: {
            show: true,
            text: 'Today'
        },
        clear: {
            show: true,
            text: 'Clear'
        },
        date: {
            show: true,
            text: 'Date'
        },
        time: {
            show: true,
            text: 'Time'
        },
        close: {
            show: true,
            text: 'Close'
        }
    },
    closeOnDateSelection: true,
    appendToBody: false,
    altInputFormats: [],
    ngModelOptions: {}
})

.filter('date1', ["$filter", function($filter) {
    return function(input) {
        if (input == null) {
            return "";
        }


        var _date = $filter('date')(new Date(input), 'MMM dd yyyy');

        return _date.toUpperCase();

    };
}])

.filter('monthDate', ["$filter", function($filter) {
    return function(input) {
        if (input == null) {
            return "";
        }
        var date = input.substr(0, 2);
        var month = input.substr(2, 2);

        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[month - 1] + ' ' + date;



    };
}])

.filter('dobdoa', ["$filter", function($filter) {
    return function(input) {
        if (input == null) {
            return "";
        }


        var date = input.substr(2, 2);
        var month = input.substr(0, 2);

        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[month - 1] + ' ' + date;



    };
}])



.filter('time1', ["$filter", function($filter) {
        return function(input) {
            if (input == null) {
                return "";
            }
            var splitdatetime = input.toString().split('T');

            var dateval = splitdatetime[0];

            var splittime = splitdatetime[1].split(':');

            var timeval = splittime[0] + ':' + splittime[1];
            var cond = dateval + ' ' + timeval;

            var _date = $filter('date')(new Date(input), 'h:mma');

            return _date;

        };
    }])
    .filter('datetime1', ["$filter", function($filter) {

        return function(input) {

            if (input == null) {
                return "";
            }
            var splitdatetime = input.toString().split('T');
            var dateval = splitdatetime[0];
            var splittime = splitdatetime[1].split(':');
            var timeval = splittime[0] + ':' + splittime[1];
            var cond = dateval + ' ' + timeval;


            var _date = $filter('date')(new Date(cond), 'yyyy-MM-dd @ h:mma');

            return _date;

        };
    }])

.filter('datetime2', ["$filter", function($filter) {

    return function(input) {

        if (input == null) {
            return "";
        }

        var splitdatetime = input.toString().split('T');
        var dateval = splitdatetime[0];
        var splittime = splitdatetime[1].split(':');
        var timeval = splittime[0] + ':' + splittime[1];
        var cond = dateval + ' ' + timeval;


        var _date = $filter('date')(new Date(cond), 'yyyy-MM-dd HH:mm');

        return _date;

    };
}])

.filter('datetime3', ["$filter", function($filter) {

    return function(input) {

        if (input == null) {
            return "";
        }

        var splitdatetime = input.split('T');
        var dateval = splitdatetime[0];
        var splittime = splitdatetime[1].split(':');
        var timeval = splittime[0] + ':' + splittime[1];
        var cond = dateval + ' ' + timeval;

        var _date = $filter('date')(new Date(cond), 'h:mma');

        return _date;

    };
}])



.directive('minimalizaSidebar', ["$timeout", function($timeout) {
        return {
            restrict: 'A',
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
            controller: ["$scope", "$element", function($scope, $element) {
                $scope.minimalize = function() {
                    angular.element('body').toggleClass('mini-navbar');
                    if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
                        // Hide menu in order to smoothly turn on when maximize menu
                        angular.element('#side-menu').hide();
                        // For smoothly turn on menu
                        $timeout(function() {
                            angular.element('#side-menu').fadeIn(400);
                        }, 200);
                    } else {
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        angular.element('#side-menu').removeAttr('style');
                    }
                };
            }]
        }
    }])
    //Filters
    .filter('geoPointToArray', function() {
        return function(input) {
            var filteredArray = [];
            _.each(input, function(coordinate) {
                filteredArray.push([coordinate.lat, coordinate.lng])
            })
            return filteredArray;
        }
    })
    .filter('geoPoint', function() {
        return function(input) {
            return [input.lat, input.lng];
        }
    });
angular.module("inspinia").run(["$templateCache", function($templateCache) {$templateCache.put("app/category/create.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-8 ibox-content\"><ul class=\"nav nav-tabs\"><li class=\"{{tabl1}}\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\">Details</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><div class=\"col-lg-12\"><br><div class=\"form-group\"><label>Name</label> <input type=\"text\" name=\"banner-url\" ng-model=\"post.name\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"> <span class=\"text-danger ng-binding\">{{errorname}}</span></div></div></div><div class=\"tab-pane\" id=\"tab_b\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\" style=\"float:left;\" ng-click=\"next(\'tabl1\')\"><button type=\"submit\" name=\"submit\" class=\"btn btn-success ng-click-active\">Back</button></a> <a href=\"/TripsDetail/#tab_c\" data-toggle=\"tab\" style=\"float:right;\" ng-click=\"next(\'tabl3\')\"><button type=\"submit\" name=\"submit\" class=\"btn btn-success ng-click-active\">Next</button></a></div><div class=\"tab-pane\" id=\"tab_c\"><div class=\"col-lg-12 ibox float-e-margins\"><br></div></div><div class=\"col-lg-12 ibox float-e-margins\"><div class=\"form-group\"><label for=\"checkbox2\">Status</label> <input type=\"checkbox\" ng-model=\"post.status\" ng-true-value=\"1001\" ng-false-value=\"1002\"></div><div class=\"form-group\"><button type=\"reset\" class=\"btn btn-danger\">Cancel</button> <button type=\"submit\" name=\"submit\" value=\"submit\" ng-click=\"onSubmit();\" class=\"btn btn-primary\">Save</button></div></div></div></div></div></div>");
$templateCache.put("app/category/list.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"ibox\"><div class=\"ibox-title\"></div><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Name</th><th>Status</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"cat in catList\"><td>{{$index+1}}</td><td>{{cat.name}}</td><td>{{cat.status | getUserStatus}}</td><td><button type=\"button\" ng-click=\"edit(region.id,region.categoryId)\" class=\"btn btn-primary btn-xs\" ng-disabled=\"true\">Edit</button></td></tr></tbody></table></div></div></div></div><br></div></div></div></div>");
$templateCache.put("app/feedback/create.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-8 ibox-content\"><ul class=\"nav nav-tabs\"><li class=\"{{tabl1}}\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\">Details</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><div class=\"col-lg-12\"><div class=\"form-group\"><select ng-model=\"post.catidVal\" ng-options=\"cat.trackid as cat.title for cat in allCatList\"></select></div></div><div class=\"col-lg-12\"><div class=\"form-group\"><label>Title</label> <input type=\"text\" name=\"banner-url\" ng-model=\"post.titlelinkVal\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"> <span class=\"text-danger ng-binding\">{{errorname}}</span></div></div><div class=\"col-lg-12\"><div class=\"form-group\"><select ng-model=\"post.testidVal\" ng-options=\"test.testid as test.name for test in alltestList\"></select></div></div><div class=\"col-lg-12\"><div class=\"form-group\"><label>Test Name</label> <input type=\"text\" name=\"banner-url\" ng-model=\"post.testnameVal\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"> <span class=\"text-danger ng-binding\">{{errorname}}</span></div></div><div class=\"col-lg-12\"><div class=\"form-group\"><label>Youtube Url</label> <input type=\"text\" name=\"banner-url\" ng-model=\"post.youtube_uniqidVal\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"> <span class=\"text-danger ng-binding\">{{errorname}}</span></div></div><div class=\"col-lg-12 ibox float-e-margins\"><div class=\"form-group\"><label for=\"checkbox2\">Status</label> <input type=\"checkbox\" ng-model=\"post.status\" ng-true-value=\"1001\" ng-false-value=\"1002\"></div><div class=\"form-group\"><button type=\"reset\" class=\"btn btn-danger\">Cancel</button> <button type=\"submit\" name=\"submit\" value=\"submit\" ng-click=\"onSubmit();\" class=\"btn btn-primary\">Save</button></div></div></div></div></div></div></div>");
$templateCache.put("app/feedback/list.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"ibox\"><div class=\"ibox-title\"><a ui-sref=\"subcategory.create\">Create</a></div><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Status</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"cat in catList\"><td>{{$index+1}}</td><td>{{cat.name}}</td><td>{{cat.email}}</td><td>{{cat.subject}}</td><td>{{cat.Message}}</td><td>{{cat.status | getUserStatus}}</td><td><button type=\"button\" ng-click=\"delete(cat.id)\" ng-disabled=\"false\" class=\"btn btn-danger btn-xs\">Delete</button></td></tr></tbody></table></div></div></div></div><br></div></div></div></div>");
$templateCache.put("app/login/index.html","<div class=\"middle-box text-center loginscreen animated fadeInDown\"><div class=\"form-container\"><img src=\"assets/images/logo.png\" alt=\"Logo\" width=\"250\"><form class=\"m-t\" role=\"form\" ng-submit=\"onSubmit()\"><div class=\"form-group\"><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-user fa\" aria-hidden=\"true\"></i></span> <input type=\"text\" ng-model=\"login.username\" class=\"form-control\" placeholder=\"User name\" required=\"\"></div></div><div class=\"form-group\"><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-lock fa-lg\" aria-hidden=\"true\"></i></span> <input type=\"password\" ng-model=\"login.password\" class=\"form-control\" placeholder=\"Password\" required=\"\"></div></div><div class=\"form-group\"><center><div class=\"input-group\"><button type=\"submit\" class=\"btn btn-info block full-width m-b\">Login</button> <span class=\"text-white ng-binding\">{{errorLogin}}</span></div></center></div></form></div></div>");
$templateCache.put("app/logout/index.html","<div class=\"middle-box text-center loginscreen animated fadeInDown\"><div>Bye :)</div><div ng-repeat=\"response in responses\"><div class=\"alert alert-danger alert-dismissable\"><button aria-hidden=\"true\" data-dismiss=\"alert\" class=\"close\" type=\"button\">×</button> {{response}}</div></div></div>");
$templateCache.put("app/main/main.html","<div class=\"wrapper wrapper-content animated fadeInRight\"><div class=\"row\"><div class=\"col-lg-12\"><div class=\"text-center m-t-lg\"><h1>{{main.helloText}}</h1><small>{{main.descriptionText}} <i class=\"glyphicon glyphicon-pencil\"></i></small></div></div></div></div>");
$templateCache.put("app/paragraph/create.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-12 ibox-content\"><ul class=\"nav nav-tabs\"><li class=\"{{tabl1}}\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\">Basic Details</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><div class=\"col-lg-12\"><div class=\"form-group\"><label>Paragraph Title</label> <input type=\"text\" class=\"form-control m-b\" ng-model=\"post.title\"></div><div class=\"form-group\"><label>Content Type</label><select placeholder=\"select Type\" class=\"form-control m-b\" tabindex=\"4\" ng-model=\"post.f2\" ng-change=\"changeType()\" ng-options=\"cat.id as cat.name for cat in contentType\"></select></div><div class=\"form-group\" ng-if=\"post.f2 == \'listening\'\"><label>Plese Select AudioFile</label><select placeholder=\"select Type\" class=\"form-control m-b\" tabindex=\"4\" ng-model=\"post.paragraph\" ng-options=\"cat.path as cat.name for cat in galleryList\"><option value=\"\" disable=\"\" hidden=\"\">Select AudioFile</option></select></div><div class=\"form-group\" ng-if=\"post.f2 != \'listening\'\"><label>Paragraph</label><text-angular ng-model=\"post.paragraph\" focus-me=\"shouldBeOpen\"></text-angular><button type=\"button\" class=\"btn btn-info btn-lg\" data-toggle=\"modal\" data-target=\"#myModal\">Browse</button></div><br><div class=\"form-group\"><button type=\"reset\" class=\"btn btn-danger\">Cancel</button> <button type=\"submit\" name=\"submit\" value=\"submit\" ng-click=\"onSubmit();\" class=\"btn btn-primary\">Save</button></div></div></div></div><div class=\"tab-pane\" id=\"tab_c\"></div><div class=\"col-lg-12 ibox float-e-margins\"></div><div id=\"myModal\" class=\"modal fade\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Path</th><th>Name</th><th>Image</th></tr></thead><tbody><tr ng-repeat=\"cat in galleryData\"><td>{{$index+1}}</td><td>{{downUrl}}{{cat.path}}</td><td>{{cat.name}}</td><td><img src=\"{{downUrl}}{{cat.path}}\" width=\"200\" height=\"200\"></td></tr></tbody></table></div></div></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></div></div></div></div></div></div>");
$templateCache.put("app/paragraph/list.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"ibox\"><div class=\"ibox-title\"><a ui-sref=\"paragraph.create\">Create</a></div><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Track Id</th><th>Tittle</th><th>Type</th><th>Note</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"qua in quaList\"><td>{{$index+1}}</td><td>{{qua.pra_trackid}}</td><td ng-bind-html=\"qua.title\"></td><td ng-bind-html=\"qua.type\"></td><td><button type=\"button\" ng-click=\"quecreate(qua.pra_trackid)\" class=\"btn btn-danger btn-xs\" ng-disabled=\"false\">Question create</button>&nbsp; <button type=\"button\" ng-click=\"quelist(qua.pra_trackid)\" class=\"btn btn-primary btn-xs\" ng-disabled=\"false\">Question List</button></td><td><button type=\"button\" ng-click=\"edit(qua.id)\" class=\"btn btn-primary btn-xs\" ng-disabled=\"false\">Edit</button> <button type=\"button\" ng-click=\"delete(qua.trackid)\" ng-disabled=\"false\" class=\"btn btn-danger btn-xs\">Delete</button></td></tr></tbody></table></div></div></div></div><br></div></div></div></div>");
$templateCache.put("app/photogallery/create.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-8 ibox-content\"><ul class=\"nav nav-tabs\"><li class=\"{{tabl1}}\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\">Details</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><div class=\"col-lg-12\"><br><div class=\"form-group\"><label>Name</label> <input type=\"text\" name=\"banner-url\" ng-model=\"post.name\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"> <span class=\"text-danger ng-binding\">{{errorname}}</span></div><div class=\"form-group\"><label>Select File Categoty</label><select placeholder=\"select Type\" class=\"form-control m-b\" tabindex=\"4\" ng-model=\"post.link\" ng-options=\"cat.name as cat.name for cat in category1\"><option value=\"\" disabled=\"\" hidden=\"\" selected=\"\">Select File Categoty</option></select></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Image/Audio</label> <input type=\"file\" ng-model=\"img\" file-model=\"imageURL\" ng-trim=\"true\" class=\"form-control\" nv-file-select=\"\" uploader=\"userUrl\" id=\"img\"><table class=\"table\"><tbody><tr ng-repeat=\"item in userUrl.queue\"><td nowrap=\"\"><button type=\"button\" class=\"btn btn-success btn-xs\" ng-click=\"item.upload()\" ng-disabled=\"item.isReady || item.isUploading || item.isSuccess\"><span class=\"glyphicon glyphicon-upload\"></span> Upload</button> <span ng-show=\"item.isSuccess\">Thumb Successfully Uploaded</span></td></tr></tbody></table><span ng-show=\"showimage\"><img src=\"{{editoldimg}}\" width=\"100\" height=\"100\" style=\"position: relative;\"> <button class=\"btn btn-danger btn-box\" id=\"close1\" ng-click=\"deleteimg()\" style=\"position: absolute; left: 80px;\">X</button></span> <span class=\"text-danger ng-binding\">{{errorimg}}</span></div></div></div><div class=\"tab-pane\" id=\"tab_b\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\" style=\"float:left;\" ng-click=\"next(\'tabl1\')\"><button type=\"submit\" name=\"submit\" class=\"btn btn-success ng-click-active\">Back</button></a> <a href=\"/TripsDetail/#tab_c\" data-toggle=\"tab\" style=\"float:right;\" ng-click=\"next(\'tabl3\')\"><button type=\"submit\" name=\"submit\" class=\"btn btn-success ng-click-active\">Next</button></a></div><div class=\"tab-pane\" id=\"tab_c\"><div class=\"col-lg-12 ibox float-e-margins\"><br></div></div><div class=\"col-lg-12 ibox float-e-margins\"><div class=\"form-group\"><label for=\"checkbox2\">Status</label> <input type=\"checkbox\" ng-model=\"post.status\" ng-true-value=\"1001\" ng-false-value=\"1002\"></div><div class=\"form-group\"><button type=\"reset\" class=\"btn btn-danger\">Cancel</button> <button type=\"submit\" name=\"submit\" value=\"submit\" ng-click=\"onSubmit();\" class=\"btn btn-primary\">Save</button></div></div></div></div></div></div>");
$templateCache.put("app/photogallery/list.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"ibox\"><div class=\"ibox-title\"><a ui-sref=\"photogallery.create\">Create</a></div><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Name</th><th>Type</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"cat in catList\"><td>{{$index+1}}</td><td>{{cat.name}}</td><td>{{cat.link}}</td><td><button type=\"button\" ng-click=\"delete(cat.id)\" ng-disabled=\"false\" class=\"btn btn-danger btn-xs\">Delete</button></td></tr></tbody></table></div></div></div></div><br></div></div></div></div>");
$templateCache.put("app/practisecategory/create.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-12 ibox-content\"><ul class=\"nav nav-tabs\"><li class=\"{{tabl1}}\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\">Details</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><div class=\"form-group\"><label>Category</label><select placeholder=\"select Category\" class=\"form-control m-b\" tabindex=\"2\" ng-model=\"post.categoryidVal\" ng-options=\"cat.id as cat.name for cat in catList\"><option value=\"\" disabled=\"\" hidden=\"\" selected=\"\">Select Category</option></select></div><div class=\"form-group\"><label>Type</label><select placeholder=\"select Question Type\" class=\"form-control m-b\" tabindex=\"2\" ng-model=\"post.questiontypeVal\" ng-options=\"questionType.id as questionType.name for questionType in questionTypeList\"><option value=\"\" disabled=\"\" hidden=\"\" selected=\"\">Select Type</option></select></div><div class=\"form-group\"><label>Lesson</label><select placeholder=\"select Lesson\" class=\"form-control m-b\" tabindex=\"2\" ng-model=\"post.lessonidVal\" ng-options=\"lesson.id as lesson.name for lesson in lessonList\"><option value=\"\" disabled=\"\" hidden=\"\" selected=\"\">Select Lesson</option></select></div><div class=\"col-lg-12\"><button type=\"button\" class=\"btn btn-info btn-lg\" ng-click=\"indexApp($index)\" data-toggle=\"modal\" data-target=\"#myModal\">Browse</button></div><div class=\"col-lg-12 ibox float-e-margins\"><div class=\"form-group\"><hr><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Name</th><th>Category</th><th>Status</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"cat in quetionsList\"><td>{{$index+1}}</td><td ng-bind-html=\"cat.name\"></td><td>{{cat.category}}</td><td>{{cat.status | getUserStatus}}</td><td><button type=\"button\" ng-click=\"deleteQua(cat.id,$index)\" ng-disabled=\"false\" class=\"btn btn-danger btn-xs\">Delete</button></td></tr></tbody></table></div><div class=\"form-group\"><button type=\"reset\" class=\"btn btn-danger\">Cancel</button> <button type=\"submit\" name=\"submit\" value=\"submit\" ng-click=\"onSubmit();\" class=\"btn btn-primary\">Save</button></div></div><div id=\"myModal\" class=\"modal fade\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"ibox-content\" style=\"border:none;\"><div><div class=\"form-group\"><select ng-model=\"post.catVal\" ng-options=\"cat.id as cat.name for cat in categories\"></select><button type=\"button\" class=\"btn btn-primary btn-xs\" ng-click=\"changeCategory()\">Go</button><div class=\"pull-right\"><input type=\"text\" name=\"banner-url\" ng-model=\"post.catVal1\" class=\"ng-pristine ng-valid\" ng-trim=\"true\"> <button type=\"button\" class=\"btn btn-primary btn-xs\" ng-click=\"changeCategory1()\">Go</button></div></div></div><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th></th><th>Id</th><th>name</th><th>Category</th><th>Note</th></tr></thead><tbody><tr ng-repeat=\"qua in quaData\"><td><input type=\"checkbox\" ng-model=\"testCheck\" ng-click=\"getQuaId(qua)\"></td><td>{{$index+1}}</td><td ng-bind-html=\"qua.name\"></td><td ng-bind-html=\"qua.category\"></td><td ng-bind-html=\"qua.note\"></td></tr></tbody></table></div></div></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Save/Close</button></div></div></div></div></div></div></div></div></div>");
$templateCache.put("app/practisecategory/list.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"ibox\"><div class=\"ibox-title\"><a ui-sref=\"practisecategory.create\">Create</a></div><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Name</th><th>Category</th><th>Status</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"cat in catList\"><td>{{$index+1}}</td><td>{{cat.lessonid}}</td><td>{{cat.questiontype}}</td><td>{{cat.status | getUserStatus}}</td><td><a ui-sref=\"practisecategory.edit({id:cat.id})\" class=\"btn btn-danger btn-primary\">Edit</a> <a ng-click=\"delete(cat.id)\" class=\"btn btn-danger btn-xs\">Delete</a></td></tr></tbody></table></div></div></div></div><br></div></div></div></div>");
$templateCache.put("app/practiselesson/create.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-8 ibox-content\"><ul class=\"nav nav-tabs\"><li class=\"{{tabl1}}\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\">Details</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><div class=\"col-lg-12\"><div class=\"form-group\"><label>Lesson Name</label> <input type=\"text\" name=\"banner-url\" ng-model=\"post.lessonnameVal\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"> <span class=\"text-danger ng-binding\">{{errorname}}</span></div></div><div class=\"col-lg-12\"><div class=\"form-group\"><select ng-model=\"post.testidVal\" ng-options=\"test.testid as test.name for test in alltestList\"><option value=\"\" disabled=\"\" hidden=\"\" selected=\"\">Select Lesson Test</option></select></div></div><div class=\"col-lg-12 ibox float-e-margins\"><div class=\"form-group\"><label for=\"checkbox2\">Status</label> <input type=\"checkbox\" ng-model=\"post.status\" ng-true-value=\"1001\" ng-false-value=\"1002\"></div><div class=\"form-group\"><button type=\"reset\" class=\"btn btn-danger\">Cancel</button> <button type=\"submit\" name=\"submit\" value=\"submit\" ng-click=\"onSubmit();\" class=\"btn btn-primary\">Save</button></div></div></div></div></div></div></div>");
$templateCache.put("app/practiselesson/list.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"ibox\"><div class=\"ibox-title\"><a ui-sref=\"practiselesson.create\">Create</a></div><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Name</th><th>Status</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"cat in catList\"><td>{{$index+1}}</td><td>{{cat.lessonnameVal}}</td><td>{{cat.status | getUserStatus}}</td><td><button type=\"button\" ng-click=\"delete(cat.id)\" ng-disabled=\"false\" class=\"btn btn-danger btn-xs\">Delete</button></td></tr></tbody></table></div></div></div></div><br></div></div></div></div>");
$templateCache.put("app/practisesubcategory/create.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-8 ibox-content\"><ul class=\"nav nav-tabs\"><li class=\"{{tabl1}}\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\">Details</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><div class=\"col-lg-12\"><div class=\"form-group\"><select ng-model=\"post.catidVal\" ng-options=\"cat.trackid as cat.title for cat in allCatList\"></select></div></div><div class=\"col-lg-12\"><div class=\"form-group\"><label>SubTittle</label> <input type=\"text\" name=\"banner-url\" ng-model=\"post.titleVal\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"> <span class=\"text-danger ng-binding\">{{errorname}}</span></div></div><div class=\"col-lg-12\"><div class=\"form-group\"><label>Test</label><br><select ng-model=\"post.testidVal\" ng-options=\"test.testid as test.name for test in alltestList\"><option value=\"\" disabled=\"\" hidden=\"\" selected=\"\">Select Test</option></select></div></div><div class=\"col-lg-12 ibox float-e-margins\"><div class=\"form-group\"><label for=\"checkbox2\">Status</label> <input type=\"checkbox\" ng-model=\"post.status\" ng-true-value=\"1001\" ng-false-value=\"1002\"></div><div class=\"form-group\"><button type=\"reset\" class=\"btn btn-danger\">Cancel</button> <button type=\"submit\" name=\"submit\" value=\"submit\" ng-click=\"onSubmit();\" class=\"btn btn-primary\">Save</button></div></div></div></div></div></div></div>");
$templateCache.put("app/practisesubcategory/list.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"ibox\"><div class=\"ibox-title\"><a ui-sref=\"practisesubcategory.create\">Create</a></div><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Name</th><th>TestId</th><th>Status</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"cat in catList\"><td>{{$index+1}}</td><td>{{cat.title}}</td><td>{{cat.testid}}</td><td>{{cat.status | getUserStatus}}</td><td><button type=\"button\" ng-click=\"delete(cat.id)\" ng-disabled=\"false\" class=\"btn btn-danger btn-xs\">Delete</button></td></tr></tbody></table></div></div></div></div><br></div></div></div></div>");
$templateCache.put("app/quations/create.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-12 ibox-content\"><ul class=\"nav nav-tabs\"><li class=\"{{tabl1}}\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\">Basic Details</a></li></ul><div ng-show=\"queview\" class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><div class=\"col-lg-12\"><div class=\"form-group\"><label>Title</label> <input type=\"text\" class=\"form-control m-b\" ng-model=\"post.title\"></div><div class=\"form-group\"><label>Question Type</label>{{post.type}}<select placeholder=\"select type\" class=\"form-control m-b\" tabindex=\"4\" ng-model=\"post.type\" ng-options=\"cat.id as cat.name for cat in catList\"></select></div><div class=\"form-group\" style=\"height:500px;\"><label>Question</label><text-angular ng-model=\"post.quetion\" focus-me=\"shouldBeOpen\"></text-angular><button type=\"button\" class=\"btn btn-info btn-lg\" data-toggle=\"modal\" data-target=\"#myModal\">Browse</button></div><br><button type=\"button\" name=\"submit\" value=\"+\" ng-click=\"addOption();\" class=\"btn btn-primary\">+</button><div class=\"form-group\" ng-repeat=\"options in post.options track by $index\"><label>Option {{$index+1}}</label><text-angular ng-model=\"options.name\" focus-me=\"shouldBeOpen\"></text-angular><button type=\"button\" class=\"btn btn-info btn-lg\" data-toggle=\"modal\" data-target=\"#myModal\">Browse</button><br><div class=\"form-group\" ng-repeat=\"answer in options.is_answer track by $index\" ng-if=\"post.type==3\"><label ng-if=\"$index == 0\">Is Answer</label> <input type=\"text\" class=\"form-control\" id=\"exampleFormControlTextarea1\" ng-model=\"options.is_answer[$index]\"> <button type=\"button\" ng-if=\"$last\" name=\"submit\" value=\"+\" ng-click=\"addOption1($parent.$parent.$index);\" class=\"btn btn-primary\">+</button> <button type=\"button\" class=\"btn btn-danger\" ng-click=\"removeOption1($parent.$index,$index);\">-</button></div><div ng-if=\"post.type!=3\" class=\"form-group\"><label>Is Answer</label> <input type=\"checkbox\" ng-model=\"options.is_answer\" ng-true-value=\"true\" ng-false-value=\"false\"></div><br><button type=\"button\" class=\"btn btn-danger\" ng-click=\"removeOption($index);\">-</button> <span ng-if=\"$index+1 != 1\"><button type=\"button\" ng-if=\"$index+1 == post.options.length\" name=\"submit\" value=\"+\" ng-click=\"addOption();\" class=\"btn btn-primary\">+</button></span><br></div><div class=\"form-group\"><button type=\"reset\" class=\"btn btn-danger\">Cancel</button><button type=\"submit\" name=\"submit\" value=\"submit\" ng-click=\"next();\" class=\"btn btn-primary\">Next</button></div></div></div></div><div ng-hide=\"queview\" class=\"tab-content\"><div class=\"col-lg-12\"><div class=\"form-group\" style=\"height:auto;\"><label>Solution</label><text-angular ng-model=\"post.solution\" focus-me=\"shouldBeOpen\"></text-angular>{{post.solution}} <button type=\"button\" class=\"btn btn-info btn-lg\" data-toggle=\"modal\" data-target=\"#myModal\">Browse</button></div><br><div class=\"form-group\"><button type=\"submit\" name=\"submit\" value=\"submit\" ng-click=\"prev();\" class=\"btn btn-danger\">Prev</button> <button type=\"submit\" name=\"submit\" value=\"submit\" ng-click=\"onSubmit();\" class=\"btn btn-primary\">Save</button></div></div></div><div class=\"col-lg-12 ibox float-e-margins\"></div><div id=\"myModal\" class=\"modal fade\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Path</th><th>Name</th><th>Image</th></tr></thead><tbody><tr ng-repeat=\"cat in galleryData\"><td>{{$index+1}}</td><td>{{downUrl}}{{cat.path}}</td><td>{{cat.name}}</td><td><img src=\"{{downUrl}}{{cat.path}}\" width=\"200\" height=\"200\"></td></tr></tbody></table></div></div></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></div></div></div></div></div></div>");
$templateCache.put("app/quations/list.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"ibox\"><div class=\"ibox-title\"></div><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Track Id</th><th>QuestionTrackid</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"qua in quaList\"><td>{{$index+1}}</td><td>{{qua.pra_trackid}}</td><td ng-bind-html=\"qua.que_trackid\"></td><td><button type=\"button\" ng-click=\"edit(qua.id)\" class=\"btn btn-primary btn-xs\" ng-disabled=\"false\">Edit</button> <button type=\"button\" ng-click=\"delete(qua.trackid)\" ng-disabled=\"false\" class=\"btn btn-danger btn-xs\">Delete</button></td></tr></tbody></table></div></div></div></div><br></div></div></div></div>");
$templateCache.put("app/quationsvideo/create.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-12 ibox-content\"><ul class=\"nav nav-tabs\"><li class=\"{{tabl1}}\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\">Basic Details</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><div class=\"col-lg-12\"><div class=\"form-group\"><label>Question Type</label><select placeholder=\"select type\" class=\"form-control m-b\" tabindex=\"4\" ng-model=\"post.question_type_id\" ng-options=\"cat.id as cat.name for cat in catList\"></select></div><div class=\"form-group\"><label>Category</label><select placeholder=\"select type\" class=\"form-control m-b\" tabindex=\"4\" ng-model=\"post.category\" ng-options=\"cat.name as cat.name for cat in categories\"></select></div><div class=\"form-group\"><label>Note</label> <input type=\"text\" class=\"form-control m-b\" ng-model=\"post.noteVal\"></div><div class=\"form-group\" ng-if=\"post.question_type_id == 3\"><label>No of Blanks</label><select placeholder=\"select type\" class=\"form-control m-b\" tabindex=\"4\" ng-model=\"post.noblk\" ng-options=\"cat.id as cat.name for cat in noOfBlanks\"></select></div><div class=\"form-group\" ng-if=\"post.question_type_id == 4\"><label>Paragraph</label><text-angular ng-model=\"post.paragraph\" focus-me=\"shouldBeOpen\"></text-angular><button type=\"button\" class=\"btn btn-info btn-lg\" data-toggle=\"modal\" data-target=\"#myModal\">Browse</button></div><div class=\"form-group\" style=\"height:500px;\"><label>Question</label><text-angular ng-model=\"post.name\" focus-me=\"shouldBeOpen\"></text-angular><button type=\"button\" class=\"btn btn-info btn-lg\" data-toggle=\"modal\" data-target=\"#myModal\">Browse</button></div><div class=\"form-group\" ng-if=\"post.question_type_id == 6\"><label>Paragraph</label><text-angular ng-model=\"post.paragraph\" focus-me=\"shouldBeOpen\"></text-angular><button type=\"button\" class=\"btn btn-info btn-lg\" data-toggle=\"modal\" data-target=\"#myModal\">Browse</button></div><br><button type=\"button\" name=\"submit\" value=\"+\" ng-click=\"addOption();\" class=\"btn btn-primary\">+</button><div class=\"form-group\" ng-repeat=\"options in post.options\"><label>Option {{$index+1}}</label><text-angular ng-if=\"post.question_type_id !=5\" ng-model=\"options.name\" focus-me=\"shouldBeOpen\"></text-angular><input ng-if=\"post.question_type_id == 7\" type=\"text\" class=\"form-control\" id=\"exampleFormControlTextarea1\" ng-model=\"options.is_answer\"> <input ng-if=\"post.question_type_id == 6\" type=\"text\" class=\"form-control\" id=\"exampleFormControlTextarea1\" ng-model=\"options.is_answer\"> <input ng-if=\"post.question_type_id == 5\" type=\"text\" class=\"form-control\" id=\"exampleFormControlTextarea1\" ng-model=\"options.is_answer\"> <button type=\"button\" class=\"btn btn-info btn-lg\" data-toggle=\"modal\" data-target=\"#myModal\">Browse</button><br><label>Is Answer</label> <input ng-if=\"post.question_type_id != 6\" type=\"checkbox\" ng-model=\"options.is_answer\" ng-true-value=\"true\" ng-false-value=\"false\"><br><button type=\"button\" class=\"btn btn-danger\" ng-click=\"removeOption($index);\">-</button> <span ng-if=\"$index+1 != 1\"><button type=\"button\" ng-if=\"$index+1 == post.options.length\" name=\"submit\" value=\"+\" ng-click=\"addOption();\" class=\"btn btn-primary\">+</button></span><br></div><div class=\"form-group\"><label>Solution</label><text-angular ng-model=\"post.solutionVal\" focus-me=\"shouldBeOpen\"></text-angular><button type=\"button\" class=\"btn btn-info btn-lg\" data-toggle=\"modal\" data-target=\"#myModal\">Browse</button></div><div class=\"form-group\"><label for=\"checkbox2\">Status</label> <input type=\"checkbox\" ng-model=\"post.status\" ng-true-value=\"1001\" ng-false-value=\"1002\"></div><div class=\"form-group\"><button type=\"reset\" class=\"btn btn-danger\">Cancel</button> <button type=\"submit\" name=\"submit\" value=\"submit\" ng-click=\"onSubmit();\" class=\"btn btn-primary\">Save</button></div></div></div></div><div class=\"tab-pane\" id=\"tab_c\"></div><div class=\"col-lg-12 ibox float-e-margins\"></div><div id=\"myModal\" class=\"modal fade\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Path</th><th>Name</th><th>Image</th></tr></thead><tbody><tr ng-repeat=\"cat in galleryData\"><td>{{$index+1}}</td><td>{{downUrl}}{{cat.path}}</td><td>{{cat.name}}</td><td><img src=\"{{downUrl}}{{cat.path}}\" width=\"200\" height=\"200\"></td></tr></tbody></table></div></div></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></div></div></div></div></div></div>");
$templateCache.put("app/quationsvideo/list.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"ibox\"><div class=\"ibox-title\"><a ui-sref=\"quations.create\">Create</a> <span class=\"pull-right\"><div class=\"form-group\"><select ng-model=\"post.catVal\" ng-options=\"cat.name as cat.name for cat in categories\"></select><button type=\"button\" class=\"btn btn-primary btn-xs\" ng-click=\"changeCategory()\">Go</button></div></span></div><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Track Id</th><th>Name</th><th>Category</th><th>Note</th><th>Status</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"qua in quaList\">{{qua}}<td>{{$index+1}}</td><td>{{qua.trackid}}</td><td ng-bind-html=\"qua.name\"></td><td ng-bind-html=\"qua.category\"></td><td ng-bind-html=\"qua.note\"></td><td>{{qua.status | getUserStatus}}</td><td><button type=\"button\" ng-click=\"edit(qua.id)\" class=\"btn btn-primary btn-xs\" ng-disabled=\"false\">Edit</button> <button type=\"button\" ng-click=\"delete(qua.trackid)\" ng-disabled=\"false\" class=\"btn btn-danger btn-xs\">Delete</button></td></tr></tbody></table></div></div></div></div><br></div></div></div></div>");
$templateCache.put("app/subcategory/create.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-8 ibox-content\"><ul class=\"nav nav-tabs\"><li class=\"{{tabl1}}\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\">Details</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><div class=\"col-lg-12\"><div class=\"form-group\"><select ng-model=\"post.catidVal\" ng-options=\"cat.trackid as cat.title for cat in allCatList\"></select></div></div><div class=\"col-lg-12\"><div class=\"form-group\"><label>Title</label> <input type=\"text\" name=\"banner-url\" ng-model=\"post.titlelinkVal\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"> <span class=\"text-danger ng-binding\">{{errorname}}</span></div></div><div class=\"col-lg-12\"><div class=\"form-group\"><select ng-model=\"post.testidVal\" ng-options=\"test.testid as test.name for test in alltestList11\"></select></div></div></div><div class=\"col-lg-12\"><div class=\"form-group\"><label>Test Name</label> <input type=\"text\" name=\"banner-url\" ng-model=\"post.testnameVal\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"> <span class=\"text-danger ng-binding\">{{errorname}}</span></div></div><div class=\"col-lg-12\"><div class=\"form-group\"><label>Youtube Url</label> <input type=\"text\" name=\"banner-url\" ng-model=\"post.youtube_uniqidVal\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"> <span class=\"text-danger ng-binding\">{{errorname}}</span></div></div><div class=\"col-lg-12 ibox float-e-margins\"><div class=\"form-group\"><label for=\"checkbox2\">Status</label> <input type=\"checkbox\" ng-model=\"post.status\" ng-true-value=\"1001\" ng-false-value=\"1002\"></div><div class=\"form-group\"><button type=\"reset\" class=\"btn btn-danger\">Cancel</button> <button type=\"submit\" name=\"submit\" value=\"submit\" ng-click=\"onSubmit();\" class=\"btn btn-primary\">Save</button></div></div></div></div></div></div>");
$templateCache.put("app/subcategory/list.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"ibox\"><div class=\"ibox-title\"><a ui-sref=\"subcategory.create\">Create</a></div><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Name</th><th>Youtube Unique Link</th><th>Status</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"cat in catList\"><td>{{$index+1}}</td><td>{{cat.titlelink}}</td><td>{{cat.youtube_uniqid}}</td><td>{{cat.status | getUserStatus}}</td><td><button type=\"button\" ng-click=\"delete(cat.id)\" ng-disabled=\"false\" class=\"btn btn-danger btn-xs\">Delete</button></td></tr></tbody></table></div></div></div></div><br></div></div></div></div>");
$templateCache.put("app/test/create.html","<div><div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-8 ibox-content\"><ul class=\"nav nav-tabs\"><li class=\"{{tabl1}}\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\">Basic Details</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><div class=\"col-lg-12\"><div class=\"form-group\"><label>Test Type</label><select placeholder=\"select Type\" class=\"form-control m-b\" tabindex=\"4\" ng-model=\"post.type\" ng-options=\"cat.name as cat.name for cat in catList\"><option value=\"\">Select Test Type</option></select></div><br><div class=\"form-group\"><label>Name</label> <input type=\"text\" name=\"banner-url\" ng-model=\"post.title\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"></div><div class=\"form-group\"><label>Plese Select Testtype</label><select placeholder=\"select TestType\" class=\"form-control m-b\" tabindex=\"4\" ng-model=\"post.f3\" ng-options=\"cat.name as cat.name for cat in testtype\"><option value=\"\">Please Section TestType</option></select></div><br><button type=\"button\" name=\"submit\" value=\"+\" ng-click=\"addSection();\" class=\"btn btn-primary\">+</button><div class=\"form-group\" ng-repeat=\"section in post.reading\"><label>Reading {{$index+1}}</label><br><button type=\"button\" class=\"btn btn-danger\" ng-click=\"removeSection($index);\">-</button> <span ng-if=\"$index+1 != 1\"><button type=\"button\" ng-if=\"$index+1 == post.section.length\" name=\"submit\" value=\"+\" ng-click=\"addSection();\" class=\"btn btn-primary\">+</button></span><div class=\"form-group\"><label>Plese Select Paragraph</label><select placeholder=\"select Type\" class=\"form-control m-b\" tabindex=\"4\" ng-model=\"section.trackid\" ng-options=\"cat.pra_trackid as cat.title for cat in quaList\"><option value=\"\">Plese Select Paragraph</option></select></div><select placeholder=\"Please Section Time\" class=\"form-control\" ng-model=\"section.time\" ng-options=\"cat.id as cat.name for cat in testtime\"><option value=\"\">Please Section Time</option></select><br></div><br><button type=\"button\" name=\"submit\" value=\"+\" ng-click=\"addSection1();\" class=\"btn btn-primary\">+</button><div class=\"form-group\" ng-repeat=\"section1 in post.lesioning\"><label>Listening {{$index+1}}</label><br><button type=\"button\" class=\"btn btn-danger\" ng-click=\"removeSection1($index);\">-</button> <span ng-if=\"$index+1 != 1\"><button type=\"button\" ng-if=\"$index+1 == post.section1.length\" name=\"submit\" value=\"+\" ng-click=\"addSection1();\" class=\"btn btn-primary\">+</button></span><div class=\"form-group\"><label>Plese Select Audio</label><select placeholder=\"select Type\" class=\"form-control m-b\" tabindex=\"4\" ng-model=\"section1.trackid\" ng-options=\"cat.pra_trackid as cat.title for cat in quaList\"><option value=\"\">Plese Select Audio</option></select></div><select placeholder=\"Please Section Time\" class=\"form-control\" ng-model=\"section1.time\" ng-options=\"cat.id as cat.name for cat in testtime\"><option value=\"\">Please Section Time</option></select><br></div><button type=\"button\" name=\"submit\" value=\"+\" ng-click=\"addSection2();\" class=\"btn btn-primary\">+</button><div class=\"form-group\" ng-repeat=\"section2 in post.writting\"><label>Writing {{$index+1}}</label><br><button type=\"button\" class=\"btn btn-danger\" ng-click=\"removeSection2($index);\">-</button> <span ng-if=\"$index+1 != 1\"><button type=\"button\" ng-if=\"$index+1 == post.section2.length\" name=\"submit\" value=\"+\" ng-click=\"addSection2();\" class=\"btn btn-primary\">+</button></span><div class=\"form-group\"><label>Plese Select Paragraph</label><select placeholder=\"select Type\" class=\"form-control m-b\" tabindex=\"4\" ng-model=\"section2.trackid\" ng-options=\"cat.pra_trackid as cat.title for cat in quaList\"><option value=\"\">Plese Select Paragraph</option></select></div><select placeholder=\"Please Section Time\" class=\"form-control\" ng-model=\"section2.time\" ng-options=\"cat.id as cat.name for cat in testtime\"><option value=\"\">Please Section Time</option></select><br></div><div class=\"form-group\"><button type=\"reset\" class=\"btn btn-danger\">Cancel</button> <button type=\"submit\" name=\"submit\" value=\"submit\" ng-click=\"onSubmit();\" class=\"btn btn-primary\" ng-disabled=\"sendingData\"><span ng-if=\"!sendingData\">Save</span> <span ng-if=\"sendingData\">Sending...</span></button></div></div></div></div><div class=\"tab-pane\" id=\"tab_c\"></div><div class=\"col-lg-12 ibox float-e-margins\"></div><div id=\"myModal\" class=\"modal fade\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"ibox-content\" style=\"border:none;\"><div><div class=\"form-group\"><select ng-model=\"post.catVal\" ng-options=\"cat.id as cat.name for cat in categories\"></select><button type=\"button\" class=\"btn btn-primary btn-xs\" ng-click=\"changeCategory()\">Go</button><div class=\"pull-right\"><input type=\"text\" name=\"banner-url\" ng-model=\"post.catVal1\" class=\"ng-pristine ng-valid\" ng-trim=\"true\"> <button type=\"button\" class=\"btn btn-primary btn-xs\" ng-click=\"changeCategory1()\">Go</button></div></div></div><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th></th><th>Id</th><th>name</th><th>Category</th><th>Note</th></tr></thead><tbody><tr ng-repeat=\"qua in quaData\"><td><input type=\"checkbox\" ng-model=\"testCheck\" ng-click=\"getQuaId(qua)\"></td><td>{{$index+1}}</td><td ng-bind-html=\"qua.name\"></td><td ng-bind-html=\"qua.category\"></td><td ng-bind-html=\"qua.note\"></td></tr></tbody></table></div></div></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Save/Close</button></div></div></div></div></div></div></div></div>");
$templateCache.put("app/test/list.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"ibox\"><div class=\"ibox-title\"><a ui-sref=\"test.create\">Create</a></div><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Name</th><th>Test Id</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"test in testList\"><td>{{$index+1}}</td><td ng-bind-html=\"test.title\"></td><td>{{test.trackid}}</td><td><button type=\"button\" ng-click=\"edit(test.id)\" class=\"btn btn-primary btn-xs\" ng-disabled=\"false\">Edit</button> <button type=\"button\" ng-click=\"delete(test.trackid)\" ng-disabled=\"false\" class=\"btn btn-danger btn-xs\">Delete</button></td></tr></tbody></table></div></div></div></div><br></div></div></div></div>");
$templateCache.put("app/test1/create.html","<div><div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-12 ibox-content\"><ul class=\"nav nav-tabs\"><li class=\"{{tabl1}}\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\">Basic Details</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><div class=\"col-lg-12\"><div class=\"form-group\"><label>Test Type</label><select placeholder=\"select Type\" class=\"form-control m-b\" tabindex=\"4\" ng-model=\"post.test_type_idVal\" ng-options=\"cat.id as cat.name for cat in catList\"></select></div><br><div class=\"form-group\"><label>Name</label> <input type=\"text\" name=\"banner-url\" ng-model=\"post.name\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"></div><br><button type=\"button\" name=\"submit\" value=\"+\" ng-click=\"addSection();\" class=\"btn btn-primary\">+</button><div class=\"form-group\" ng-repeat=\"section in post.sections\"><label>Section {{$index+1}}</label><br><button type=\"button\" class=\"btn btn-danger\" ng-click=\"removeSection($index);\">-</button> <span ng-if=\"$index+1 != 1\"><button type=\"button\" ng-if=\"$index+1 == post.section.length\" name=\"submit\" value=\"+\" ng-click=\"addSection();\" class=\"btn btn-primary\">+</button></span> <button type=\"button\" class=\"btn btn-info btn-lg\" ng-click=\"indexApp($index)\" data-toggle=\"modal\" data-target=\"#myModal\">Browse</button> {{section.questionids}}<select placeholder=\"Please Section Time\" class=\"form-control\" ng-model=\"section.time\" ng-options=\"cat.id as cat.name for cat in testtime\"><option value=\"disabled hidden selected\">Please Section Time</option></select><br></div><div class=\"form-group\"><label for=\"checkbox2\">Status</label> <input type=\"checkbox\" ng-model=\"post.status\" ng-true-value=\"1001\" ng-false-value=\"1002\"></div><div class=\"form-group\"><button type=\"reset\" class=\"btn btn-danger\">Cancel</button> <button type=\"submit\" name=\"submit\" value=\"submit\" ng-click=\"onSubmit();\" class=\"btn btn-primary\">Save</button></div></div></div></div><div class=\"tab-pane\" id=\"tab_c\"></div><div class=\"col-lg-12 ibox float-e-margins\"></div><div id=\"myModal\" class=\"modal fade\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th></th><th>Id</th><th>name</th><th>Category</th><th>Note</th></tr></thead><tbody><tr ng-repeat=\"qua in quaData\"><td><input type=\"checkbox\" ng-model=\"testCheck\" ng-click=\"getQuaId(qua)\"></td><td>{{$index+1}}</td><td ng-bind-html=\"qua.name\"></td><td ng-bind-html=\"qua.category\"></td><td ng-bind-html=\"qua.note\"></td></tr></tbody></table></div></div></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Save/Close</button></div></div></div></div></div></div></div></div>");
$templateCache.put("app/test1/list.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"ibox\"><div class=\"ibox-title\"><a ui-sref=\"test.create\">Create</a></div><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Name</th><th>Test Id</th><th>Test type</th><th>Status</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"test in testList\"><td>{{$index+1}}</td><td ng-bind-html=\"test.name\"></td><td>{{test.testid}}</td><td>{{test.test_type_id}}</td><td>{{test.status | getUserStatus}}</td><td><button type=\"button\" ng-click=\"edit(test.id)\" class=\"btn btn-primary btn-xs\" ng-disabled=\"false\">Edit</button> <button type=\"button\" ng-click=\"delete(test.trackid)\" ng-disabled=\"false\" class=\"btn btn-danger btn-xs\">Delete</button></td></tr></tbody></table></div></div></div></div><br></div></div></div></div>");
$templateCache.put("app/users/create.html","<div><div ng-hide=\"loader\" class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><form name=\"newDiscoveryForm\" class=\"m-t\" role=\"form\" ng-submit=\"onSubmit()\"><div class=\"col-lg-8 ibox-content\"><ul class=\"nav nav-tabs\"><li class=\"{{tabl1}}\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\">Details</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><div class=\"col-lg-12\"><div class=\"form-group\"><label>Name</label> <input type=\"text\" name=\"banner-url\" required=\"\" ng-model=\"post.fullnameVal\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"> <span class=\"text-danger ng-binding\">{{errorname}}</span></div></div><div class=\"col-lg-12\"><div class=\"form-group\"><label>Email</label> <input type=\"email\" name=\"banner-url\" required=\"\" ng-model=\"post.emailVal\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"> <span class=\"text-danger ng-binding\">{{errorname}}</span></div></div><div class=\"col-lg-12\"><div class=\"form-group\"><label>Branch</label><select placeholder=\"select\" required=\"\" class=\"form-control m-b\" ng-model=\"post.branchVal\" ng-options=\"cat.name as cat.name for cat in catList\"><option value=\"\" disabled=\"\" hidden=\"\" selected=\"\">Select Branch</option></select></div></div><div class=\"col-lg-12\"><div class=\"form-group\"><label>PhoneNumber</label> <input type=\"text\" maxlength=\"11\" required=\"\" name=\"banner-url\" ng-model=\"post.phonenumberVal\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"> <span class=\"text-danger ng-binding\">{{errorname}}</span></div></div>{{}}<div class=\"col-lg-12 ibox float-e-margins\"><div class=\"form-group\"><button type=\"reset\" class=\"btn btn-danger\">Reset</button> <button type=\"submit\" name=\"submit\" ng-disabled=\"newDiscoveryForm.$invalid\" value=\"submit\" class=\"btn btn-primary\">Register</button></div></div></div></div></div></form></div></div><div ng-show=\"loader\"><div id=\"overlay\"></div></div><style>\n              .loader {\n                border: 16px solid #f3f3f3;\n                border-radius: 50%;\n                border-top: 16px solid blue;\n                border-bottom: 16px solid blue;\n                width: 120px;\n                height: 120px;\n                -webkit-animation: spin 2s linear infinite;\n                animation: spin 2s linear infinite;\n              }\n              \n              @-webkit-keyframes spin {\n                0% { -webkit-transform: rotate(0deg); }\n                100% { -webkit-transform: rotate(360deg); }\n              }\n              \n              @keyframes spin {\n                0% { transform: rotate(0deg); }\n                100% { transform: rotate(360deg); }\n              }\n              #overlay {\n                position: fixed; /* Sit on top of the page content */\n                display: none; /* Hidden by default */\n                width: 100%; /* Full width (cover the whole page) */\n                height: 100%; /* Full height (cover the whole page) */\n                top: 0; \n                left: 0;\n                right: 0;\n                bottom: 0;\n                background-color: rgba(0,0,0,0.5); /* Black background with opacity */\n                z-index: 2; /* Specify a stack order in case you\'re using a different order for other elements */\n                cursor: pointer; /* Add a pointer on hover */\n            }\n       </style></div>");
$templateCache.put("app/users/list.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"ibox\"><div class=\"ibox-title\"><a ui-sref=\"users.create\">Create</a> <span class=\"pull-right\"><div class=\"form-group\"><select ng-model=\"post.catVal\" ng-options=\"cat.name as cat.name for cat in categories\"><option value=\"\" disabled=\"\" hidden=\"\" selected=\"\">Select Branch</option></select><button type=\"button\" class=\"btn btn-primary btn-xs\" ng-click=\"changeCategory()\">Go</button></div></span></div><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Fullname</th><th>Email</th><th>Branch</th><th>Phonenumber</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"cat in catList\"><td>{{$index+1}}</td><td>{{cat.fullname}}</td><td>{{cat.email}}</td><td>{{cat.branch}}</td><td>{{cat.phonenumber}}</td><td><button type=\"button\" data-ng-disabled=\"{{cat.status}} != 1002\" ng-click=\"Activate(cat.id)\" class=\"btn btn-primary btn-xs\">Activate</button> <button type=\"button\" data-ng-disabled=\"{{cat.status}} == 1002\" ng-click=\"Deactivate(cat.id)\" ng-disabled=\"false\" class=\"btn btn-danger btn-xs\">Deactivate</button></td></tr></tbody></table></div></div></div></div><br></div></div></div></div>");
$templateCache.put("app/vediogallery/create.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-8 ibox-content\"><ul class=\"nav nav-tabs\"><li class=\"{{tabl1}}\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\">Details</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><div class=\"col-lg-12\"><div class=\"form-group\"><label>Video Category</label> <input type=\"text\" name=\"banner-url\" ng-model=\"post.titleVal\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"> <span class=\"text-danger ng-binding\">{{errorname}}</span></div></div><div class=\"col-lg-12\"><div class=\"form-group\"><select ng-model=\"post.testidVal\" ng-options=\"test.testid as test.name for test in alltestList\"></select></div></div><div class=\"col-lg-12 ibox float-e-margins\"><div class=\"form-group\"><label for=\"checkbox2\">Status</label> <input type=\"checkbox\" ng-model=\"post.status\" ng-true-value=\"1001\" ng-false-value=\"1002\"></div><div class=\"form-group\"><button type=\"reset\" class=\"btn btn-danger\">Cancel</button> <button type=\"submit\" name=\"submit\" value=\"submit\" ng-click=\"onSubmit();\" class=\"btn btn-primary\">Save</button></div></div></div></div></div></div></div>");
$templateCache.put("app/vediogallery/list.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"ibox\"><div class=\"ibox-title\"><a ui-sref=\"vediogallery.create\">Create</a></div><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Name</th><th>Status</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"cat in catList\"><td>{{$index+1}}</td><td>{{cat.title}}</td><td>{{cat.status | getUserStatus}}</td><td><button type=\"button\" ng-click=\"delete(cat.id)\" ng-disabled=\"false\" class=\"btn btn-danger btn-xs\">Delete</button></td></tr></tbody></table></div></div></div></div><br></div></div></div></div>");
$templateCache.put("app/videotest/create.html","<div><div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-12 ibox-content\"><ul class=\"nav nav-tabs\"><li class=\"{{tabl1}}\"><a href=\"/TripsDetail/#tab_a\" data-toggle=\"tab\">Basic Details</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><div class=\"col-lg-8\"><div class=\"form-group\"><label>Test Type</label><select placeholder=\"select Type\" class=\"form-control m-b\" tabindex=\"4\" ng-model=\"post.test_type_idVal\" ng-options=\"cat.id as cat.name for cat in catList\"></select></div><br><div class=\"form-group\"><label>Name</label> <input type=\"text\" name=\"banner-url\" ng-model=\"post.name\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"></div><br><button type=\"button\" name=\"submit\" value=\"+\" ng-click=\"addSection();\" class=\"btn btn-primary\">+</button><div class=\"form-group\" ng-repeat=\"section in post.sections\"><label>Section {{$index+1}}</label><br><button type=\"button\" class=\"btn btn-danger\" ng-click=\"removeSection($index);\">-</button> <span ng-if=\"$index+1 != 1\"><button type=\"button\" ng-if=\"$index+1 == post.section.length\" name=\"submit\" value=\"+\" ng-click=\"addSection();\" class=\"btn btn-primary\">+</button></span> <button type=\"button\" class=\"btn btn-info btn-lg\" ng-click=\"indexApp($index)\" data-toggle=\"modal\" data-target=\"#myModal\">Browse</button> {{section.questionids}}<select ng-model=\"section.time\" ng-options=\"cat.id as cat.name for cat in testtime\"><option value=\"\">Select Section Time</option></select><select ng-model=\"section.category\" ng-options=\"cat.name as cat.name for cat in categories\"><option value=\"\">Select Category</option></select><br></div><div class=\"form-group\"><label for=\"checkbox2\">Status</label> <input type=\"checkbox\" ng-model=\"post.status\" ng-true-value=\"1001\" ng-false-value=\"1002\"></div><div class=\"form-group\"><button type=\"reset\" class=\"btn btn-danger\">Cancel</button> <button type=\"submit\" name=\"submit\" value=\"submit\" ng-click=\"onSubmit();\" class=\"btn btn-primary\">Save</button></div></div></div></div><div class=\"tab-pane\" id=\"tab_c\"></div><div class=\"col-lg-12 ibox float-e-margins\"></div><div id=\"myModal\" class=\"modal fade\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"ibox-content\" style=\"border:none;\"><div><div class=\"form-group\"><select ng-model=\"post.catVal\" ng-options=\"cat.id as cat.name for cat in categories\"></select><button type=\"button\" class=\"btn btn-primary btn-xs\" ng-click=\"changeCategory()\">Go</button><div class=\"pull-right\"><input type=\"text\" name=\"banner-url\" ng-model=\"post.catVal1\" class=\"ng-pristine ng-valid\" ng-trim=\"true\"> <button type=\"button\" class=\"btn btn-primary btn-xs\" ng-click=\"changeCategory1()\">Go</button></div></div></div><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th></th><th>Id</th><th>name</th><th>Category</th><th>Note</th></tr></thead><tbody><tr ng-repeat=\"qua in quaData\"><td><input type=\"checkbox\" ng-model=\"testCheck\" ng-click=\"getQuaId(qua)\"></td><td>{{$index+1}}</td><td ng-bind-html=\"qua.name\"></td><td ng-bind-html=\"qua.category\"></td><td ng-bind-html=\"qua.note\"></td></tr></tbody></table></div></div></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Save/Close</button></div></div></div></div></div></div></div></div>");
$templateCache.put("app/videotest/list.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"ibox\"><div class=\"ibox-title\"><a ui-sref=\"videotest.create\">Create</a></div><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Name</th><th>Test Id</th><th>Test type</th><th>Status</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"test in testList\"><td>{{$index+1}}</td><td ng-bind-html=\"test.name\"></td><td>{{test.testid}}</td><td>{{test.test_type_id}}</td><td>{{test.status | getUserStatus}}</td><td><button type=\"button\" ng-click=\"edit(test.id)\" class=\"btn btn-primary btn-xs\" ng-disabled=\"false\">Edit</button> <button type=\"button\" ng-click=\"delete(test.trackid)\" ng-disabled=\"false\" class=\"btn btn-danger btn-xs\">Delete</button></td></tr></tbody></table></div></div></div></div><br></div></div></div></div>");
$templateCache.put("app/writingreview/create.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-12 ibox-content\"><ul class=\"nav nav-tabs\"></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><div class=\"col-lg-12\"><div class=\"form-group\"><label style=\"color: blueviolet;\">{{actpara+1}} Question</label><p ng-bind-html=\"writingData[actpara].paragraph\"></p></div></div><div class=\"col-lg-12\"><div class=\"form-group\" ng-repeat=\"options in writingData[actpara].options\"><label style=\"color: blueviolet;\">UserAnswer</label><p ng-bind-html=\"options.user_ans\"></p></div></div><div class=\"col-lg-12\"><div class=\"col-md-6\"><label style=\"color: blueviolet;\">Score</label><select ng-model=\"writingData[actpara].options[0].score\" ng-options=\"score.name as score.name for score in scores\"><option value=\"\">Select Score</option></select></div><div><span style=\"color:red\">{{errorMsg}}</span></div><div class=\"col-md-6\"><div class=\"form-group\"><button type=\"reset\" style=\"position: relative;left: 191px;\" ng-click=\"btnPre()\" class=\"btn btn-info\" ng-if=\"actpara != 0\">Previous Question</button> <button type=\"reset\" ng-click=\"btnNext()\" class=\"btn btn-warning pull-right\" ng-if=\"writingData.length-1 !=actpara\">Next Question</button> <button ng-hide=\"show\" type=\"reset\" ng-click=\"btnSave()\" class=\"btn btn-danger pull-right\" ng-if=\"writingData.length==actpara+1\">Save review data</button> <button ng-show=\"show\" type=\"reset\" ng-disabled=\"true\" class=\"btn btn-danger pull-right\" ng-if=\"writingData.length==actpara+1\">Sending...</button></div></div></div></div></div></div></div></div>");
$templateCache.put("app/writingreview/list.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"ibox\"><div class=\"ibox-title\"><span class=\"pull-right\"><div class=\"form-group\"><select ng-model=\"post.catVal\" ng-options=\"cat.name as cat.name for cat in categories\"><option value=\"\" disabled=\"\" hidden=\"\" selected=\"\">Select Branch</option></select><button type=\"button\" class=\"btn btn-primary btn-xs\" ng-click=\"changeCategory()\">Go</button></div></span></div><div class=\"ibox-content\" style=\"border:none;\"><div class=\"clients-list\"><div class=\"full-height-scroll\"><div class=\"table-responsive\"><table class=\"ordersView\" datatable=\"ng\" dt-options=\"dtOptions\"><thead><tr><th>Id</th><th>Userid</th><th>Writingstatus</th><th>Branch</th><th>Testtype</th><th>Action</th></tr></thead><tbody><tr ng-repeat=\"cat in catList\"><td>{{$index+1}}</td><td>{{cat.userid}}</td><td>{{cat.writing_status }}</td><td>{{cat.branch}}</td><td>{{cat.testtype }}</td><td><button type=\"button\" ng-click=\"review(cat.userid,cat.testId,cat.fullname)\" ng-disabled=\"false\" class=\"btn btn-danger btn-xs\">Review</button></td></tr></tbody></table></div></div></div></div><br></div></div></div></div>");
$templateCache.put("components/common/content.html","<div id=\"wrapper\"><div ng-include=\"\'components/common/navigation.html\'\"></div><div id=\"page-wrapper\" class=\"gray-bg {{$state.current.name}}\"><div ng-include=\"\'components/common/topnavbar.html\'\"></div><div ui-view=\"\"></div><div ng-include=\"\'components/common/footer.html\'\"></div></div></div>");
$templateCache.put("components/common/footer.html","<div class=\"footer\"><div <strong=\"\">Copyright <a href=\"http://www.texasreview.in/\">TexasReview India Pvt Ltd.</a> &copy; 2018</div></div>");
$templateCache.put("components/common/ibox_tools.html","<div class=\"ibox-tools dropdown\" dropdown=\"\"><a ng-click=\"showhide()\"><i class=\"fa fa-chevron-up\"></i></a> <a class=\"dropdown-toggle\" href=\"\" dropdown-toggle=\"\"><i class=\"fa fa-wrench\"></i></a><ul class=\"dropdown-menu dropdown-user\"><li><a href=\"\">Config option 1</a></li><li><a href=\"\">Config option 2</a></li></ul><a ng-click=\"closebox()\"><i class=\"fa fa-times\"></i></a></div>");
$templateCache.put("components/common/navigation.html","<nav class=\"navbar-default navbar-static-side\" role=\"navigation\"><div class=\"sidebar-collapse\"><ul side-navigation=\"\" class=\"nav metismenu\" id=\"side-menu\"><li class=\"nav-header\"><div class=\"dropdown profile-element\" dropdown=\"\"><a class=\"dropdown-toggle\" dropdown-toggle=\"\" href=\"\"><span class=\"clear\"><span class=\"block m-t-xs\"><img class=\"logo\" src=\"assets/images/logo.png\" alt=\"Logo\"></span></span></a><ul class=\"dropdown-menu animated fadeInRight m-t-xs\"><li><a href=\"\">Logout</a></li></ul></div><div style=\"font-size: 16px;\" class=\"logo-element\">IELTS</div></li><li ng-class=\"{active: $state.includes(\'users\')}\"><a><i class=\"fa fa-user\"></i> <span class=\"nav-label\">Users</span> <span class=\"fa arrow\"></span></a><ul class=\"nav nav-second-level collapse\" ng-class=\"{in: $state.includes(\'users\')}\"><li ui-sref-active=\"\"><a ui-sref=\"users\">List</a></li></ul></li><li ng-class=\"{active: $state.includes(\'photogallery\')}\" ng-if=\"userDetails.id !=2&&userDetails.id !=3\"><a><i class=\"fa fa-image\"></i> <span class=\"nav-label\">FileUpload</span> <span class=\"fa arrow\"></span></a><ul class=\"nav nav-second-level collapse\" ng-class=\"{in: $state.includes(\'photogallery\')}\"><li ui-sref-active=\"\"><a ui-sref=\"photogallery\">List</a></li></ul></li><li ng-class=\"{active: $state.includes(\'test\')}\" ng-if=\"userDetails.id !=2&&userDetails.id !=3\"><a><i class=\"fa fa-bicycle\"></i> <span class=\"nav-label\">Test</span> <span class=\"fa arrow\"></span></a><ul class=\"nav nav-second-level collapse\" ng-class=\"{in: $state.includes(\'test\')}\"><li ui-sref-active=\"\"><a ui-sref=\"test\">List</a></li></ul></li><li ng-class=\"{active: $state.includes(\'writingreview\')}\"><a><i class=\"fa fa-video-camera\"></i> <span class=\"nav-label\">WritingReview</span> <span class=\"fa arrow\"></span></a><ul class=\"nav nav-second-level collapse\" ng-class=\"{in: $state.includes(\'writingreview\')}\"><li ui-sref-active=\"\"><a ui-sref=\"writingreview\">List</a></li></ul></li><li ng-class=\"{active: $state.includes(\'vediogallery\')}\" ng-if=\"userDetails.id !=2&&userDetails.id !=3\"><a><i class=\"fa fa-video-camera\"></i> <span class=\"nav-label\">Videos</span> <span class=\"fa arrow\"></span></a><ul class=\"nav nav-second-level collapse\" ng-class=\"{in: $state.includes(\'vediogallery\')}\"><li ui-sref-active=\"\"><a ui-sref=\"vediogallery\">category</a></li><li ui-sref-active=\"\"><a ui-sref=\"subcategory\">subcategory</a></li></ul></li><li ng-class=\"{active: $state.includes(\'quationsvideo\')}\" ng-if=\"userDetails.id !=2&&userDetails.id !=3\"><a><i class=\"fa fa-book\"></i> <span class=\"nav-label\">VideoQuestions</span> <span class=\"fa arrow\"></span></a><ul class=\"nav nav-second-level collapse\" ng-class=\"{in: $state.includes(\'quationsvideo\')}\"><li ui-sref-active=\"\"><a ui-sref=\"quationsvideo\">List</a></li></ul></li><li ng-class=\"{active: $state.includes(\'videotest\')}\" ng-if=\"userDetails.id !=2&&userDetails.id !=3\"><a><i class=\"fa fa-bicycle\"></i> <span class=\"nav-label\">VideoTest</span> <span class=\"fa arrow\"></span></a><ul class=\"nav nav-second-level collapse\" ng-class=\"{in: $state.includes(\'videotest\')}\"><li ui-sref-active=\"\"><a ui-sref=\"videotest\">List</a></li></ul></li></ul></div></nav>");
$templateCache.put("components/common/topnavbar.html","<div class=\"row border-bottom\"><nav class=\"navbar navbar-static-top white-bg\" role=\"navigation\" style=\"margin-bottom: 0\"><div class=\"navbar-header\"><span minimaliza-sidebar=\"\"></span></div><ul class=\"nav navbar-top-links navbar-right\"><li><a ui-sref=\"logout\"><i class=\"fa fa-sign-out\"></i> Log out</a></li></ul></nav></div><div class=\"row wrapper border-bottom white-bg page-heading\"><div class=\"col-lg-10\"><h2>{{ $state.current.title }}</h2></div><div class=\"col-lg-2\"><ol breadcrumbs=\"\" class=\"breadcrumb\"><li ng-repeat=\"breadcrumb in breadcrumbs\"><a ui-sref=\"{{breadcrumb.stateName}}\">{{breadcrumb.text}}</a></li></ol></div></div>");
$templateCache.put("components/common/directives/listdirective.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-12\"><div class=\"ibox float-e-margins\"><div class=\"ibox-title\"><table width=\"50%\"><tr><td><datepicker date-format=\"yyyy-MM-dd\" selector=\"form-control\"><div class=\"input-group\" style=\"padding:0px\"><input class=\"form-control\" placeholder=\"From date\" ng-model=\"fromDate\"> <span class=\"input-group-addon\" style=\"cursor: pointer\"><i class=\"fa fa-calendar text-navy\"></i></span></div></datepicker></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td></td><td><datepicker date-format=\"yyyy-MM-dd\" selector=\"form-control\"><div class=\"input-group\" style=\"padding:0px\"><input class=\"form-control\" placeholder=\"To date\" ng-model=\"toDate\"> <span class=\"input-group-addon\" style=\"cursor: pointer\"><i class=\"fa fa-calendar text-navy\"></i></span></div></datepicker></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><button type=\"button\" ng-click=\"DateSelect()\" class=\"btn btn-danger\"><i class=\"fa fa-search\"></i>&nbsp;&nbsp;Search</button></td></tr></table></div><div class=\"ibox-title\"><ul class=\"nav nav-tabs\"><li class=\"active\"><a href=\"orders/#tab_a\" data-toggle=\"tab\" ng-click=\"statusChange(10050)\">All</a></li><li><a href=\"orders/#tab_a\" data-toggle=\"tab\" ng-click=\"statusChange(1001)\">New Order</a></li><li><a href=\"orders/#tab_a\" data-toggle=\"tab\" ng-click=\"statusChange(1002)\">Assigned</a></li><li><a href=\"orders/#tab_a\" data-toggle=\"tab\" ng-click=\"statusChange(1003)\">Completed</a></li><li><a href=\"orders/#tab_a\" data-toggle=\"tab\" ng-click=\"statusChange(1006)\">Delivered</a></li><li><a href=\"orders/#tab_a\" data-toggle=\"tab\" ng-click=\"statusChange(1005)\">Dispatched</a></li><li><a href=\"orders/#tab_a\" data-toggle=\"tab\" ng-click=\"statusChange(1004)\">Cancelled</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><h1></h1><table class=\"table table-striped table-bordered table-hover dataTables-example\"><thead><tr><th>S. No.</th><th>Order Number</th><th>Order id</th><th>OrderDate</th><th>Appointment ID</th><th>Appointment Date</th><th>Appointment Executive</th><th>Customer Name</th><th>Customer Mobile</th><th>Status</th><th>Total Price</th><th></th></tr></thead><tbody><tr ng-repeat=\"orders in list | orderBy:\'-index\'\"><td>{{droppage+$index+1}}</td><td>{{orders.order_number}}</td><td>{{orders.id}}</td><td>{{orders.order_date | date1}}</td><td>{{orders.quotationid.id}}</td><td>{{orders.quotationid.appointment_date | date1}}</td><td>{{orders.executive.name}}</td><td>{{orders.customer_name}}</td><td>{{orders.customerdata.mobileno}}</td><td>{{orders.status | OrderStatus}}</td><td>{{orders.total_price | currency:\"&#8377; \"}}</td><td><button type=\"button\" ng-click=\"view(orders.id)\" class=\"btn btn-primary btn-xs\">View</button></td></tr></tbody></table><div class=\"pager\"><ul class=\"paginate clearfix float-right\"><ul class=\"paginate clearfix float-right\"><li class=\"navpage\" ng-hide=\"droppage == 0\"><a ng-click=\"currentPage1(\'prev\')\">Prev</a></li><li class=\"single\">Page {{droppage | currentpage1}} of {{pages}}</li><li class=\"navpage\" ng-hide=\"droppage == nexthideli\"><a ng-click=\"currentPage1(\'next\')\">Next</a></li><li class=\"navpage\"><a>Pages:<select tabindex=\"4\" ng-model=\"droppage\" ng-change=\"gotopage(droppage)\" ng-options=\"option.name as option.id for option in page\"></select></a></li></ul></ul></div></div></div></div></div></div></div></div>");
$templateCache.put("components/common/directives/listdirective1.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-12\"><div class=\"ibox float-e-margins\"><div class=\"ibox-title\"><table width=\"50%\"><tr><td><datepicker date-format=\"yyyy-MM-dd\" selector=\"form-control\"><div class=\"input-group\" style=\"padding:0px\"><input class=\"form-control\" placeholder=\"From date\" ng-model=\"fromDate\"> <span class=\"input-group-addon\" style=\"cursor: pointer\"><i class=\"fa fa-calendar text-navy\"></i></span></div></datepicker></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td></td><td><datepicker date-format=\"yyyy-MM-dd\" selector=\"form-control\"><div class=\"input-group\" style=\"padding:0px\"><input class=\"form-control\" placeholder=\"To date\" ng-model=\"toDate\"> <span class=\"input-group-addon\" style=\"cursor: pointer\"><i class=\"fa fa-calendar text-navy\"></i></span></div></datepicker></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><button type=\"button\" ng-click=\"DateSelect()\" class=\"btn btn-danger\"><i class=\"fa fa-search\"></i>&nbsp;&nbsp;Search</button></td><a ui-sref=\"quotations.create({Id:\'add\',type:\'add\'})\" class=\"btn btn-primary pull-right btn-circle\"><i class=\"fa fa-plus\"></i></a></tr></table></div></div><div class=\"ibox-title\"><ul class=\"nav nav-tabs\"><li class=\"active\"><a href=\"appointments/#tab_a\" data-toggle=\"tab\" ng-click=\"statusChange(10050)\">All</a></li><li><a href=\"appointments/#tab_a\" data-toggle=\"tab\" ng-click=\"statusChange(1001)\">New Appointment</a></li><li><a href=\"appointments/#tab_a\" data-toggle=\"tab\" ng-click=\"statusChange(1002)\">Assigned</a></li><li><a href=\"appointments/#tab_a\" data-toggle=\"tab\" ng-click=\"statusChange(1003)\">Completed</a></li><li><a href=\"appointments/#tab_a\" data-toggle=\"tab\" ng-click=\"statusChange(1004)\">Cancelled</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><h1></h1><table class=\"table table-striped table-bordered table-hover dataTables-example\"><thead><tr><th>S. No.</th><th>Index</th><th>ID</th><th>User name</th><th>Phone No</th><th>Appointment date</th><th>Appointment time</th><th>Status</th><th>Device Type</th><th>Executive</th><th></th></tr></thead><tbody><tr ng-repeat=\"quo in list | orderBy:\'-index\'\"><td>{{droppage+$index+1}}</td><td>{{quo.index}}</td><td>{{quo.id}}</td><td>{{quo[\"customer\"][\"name\"]}}</td><td>{{quo[\"customer\"][\"mobileno\"]}}</td><td>{{quo.appointment_date | date1}}</td><td>{{quo[\"appointment_time\"]}}</td><td>{{quo[\"status\"] | AppaintmentStatus}}</td><td>{{quo[\"device_type\"]}}</td><td>{{quo.executive.name}}</td><td><button type=\"button\" ng-click=\"view(quo.id)\" class=\"btn btn-primary btn-xs\">View</button></td></tr></tbody></table><div class=\"pager\"><ul class=\"paginate clearfix float-right\"><li class=\"navpage\" ng-hide=\"droppage == 0\"><a ng-click=\"currentPage1(\'prev\')\">Prev</a></li><li class=\"single\">Page {{droppage | currentpage1}} of {{pages}}</li><li class=\"navpage\" ng-hide=\"droppage == nexthideli\"><a ng-click=\"currentPage1(\'next\')\">Next</a></li><li class=\"navpage\"><a>Pages:<select tabindex=\"4\" ng-model=\"droppage\" ng-change=\"gotopage(droppage)\" ng-options=\"option.name as option.id for option in page\"></select></a></li></ul></div></div></div></div></div></div></div>");
$templateCache.put("components/common/directives/listdirective2.html","<div class=\"wrapper wrapper-content animated fadeIn\"><div class=\"row\"><div class=\"col-lg-12\"><div class=\"ibox float-e-margins\"><div class=\"ibox-title\"><table width=\"70%\"><tr><td><select class=\"form-control m-b\" tabindex=\"4\" ng-model=\"dobmonth\" ng-change=\"dobmonthget($index);\" ng-options=\"month.id as month.name for month in months\"><option value=\"\" class=\"\">Select Month</option></select></td><td>&nbsp;&nbsp;&nbsp;</td><td></td><td><select class=\"form-control m-b\" tabindex=\"4\" ng-model=\"dobdate\" ng-options=\"dobdate.id as dobdate.name for dobdate in dobdates\"><option value=\"\" class=\"\">Select Date</option></select></td><td>&nbsp;&nbsp;&nbsp;</td><td><button type=\"button\" ng-click=\"statusChange(\'date_of_birth\')\" class=\"btn btn-danger\"><i class=\"fa fa-search\"></i>&nbsp;&nbsp;Search</button></td></tr><tr><td></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td></td><td></td></tr></table></div></div><div class=\"ibox-title\" ng-hide=\"sendpush\"><ul class=\"nav nav-tabs\"><li class=\"active\"><a href=\"appointments/#tab_a\" data-toggle=\"tab\" ng-click=\"statusChange(\'date_of_birth\')\">Dob</a></li><li><a href=\"appointments/#tab_a\" data-toggle=\"tab\" ng-click=\"statusChange(\'date_of_anniversary\')\">Doa</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane active\" id=\"tab_a\"><h1></h1><table class=\"table table-striped table-bordered table-hover dataTables-example\"><thead><tr><th></th><th>S. No.</th><th>Index</th><th>ID</th><th>User name</th><th>Phone No</th><th>Date</th></tr></thead><tbody><tr ng-repeat=\"user in list | orderBy:\'-index\'\"><td><input type=\"checkbox\" ng-model=\"list[user.id]\" ng-click=\"sendVal(user.id,$index)\" ng-checked=\"user.checked\"></td><td>{{droppage+$index+1}}</td><td>{{user.index}}</td><td>{{user.id}}</td><td>{{user[\"name\"]}}</td><td>{{user[\"mobileno\"]}}</td><td>{{user[statusTab] | monthDate }}</td></tr></tbody></table><div class=\"pager\"><ul class=\"paginate clearfix float-right\"><li class=\"navpage\" ng-hide=\"droppage == 0\"><a ng-click=\"currentPage1(\'prev\')\">Prev</a></li><li class=\"single\">Page {{droppage | currentpage1}} of {{pages}}</li><li class=\"navpage\" ng-hide=\"droppage == nexthideli\"><a ng-click=\"currentPage1(\'next\')\">Next</a></li><li class=\"navpage\"><a>Pages:<select tabindex=\"4\" ng-model=\"droppage\" ng-change=\"gotopage(droppage)\" ng-options=\"option.name as option.id for option in page\"></select></a></li></ul></div></div></div></div><div class=\"ibox-title\" ng-show=\"sendpush\"><table width=\"70%\"><tr><td><textarea type=\"text\" name=\"banner-url\" ng-model=\"message\" placeholder=\"Message\" class=\"form-control ng-pristine ng-valid\" ng-trim=\"true\"></textarea></td><td>&nbsp;&nbsp;&nbsp;</td><td><button type=\"button\" ng-click=\"send()\" class=\"btn btn-primary\">Send</button></td></tr></table></div></div></div></div>");}]);