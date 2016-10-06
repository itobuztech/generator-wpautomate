<?php

  global $wp_registered_widget_controls;
  $widget_controls = $wp_registered_widget_controls;

  $available_widgets = array();

  foreach ( $widget_controls as $widget )
  {

    if ( ! empty( $widget['id_base'] ) && ! isset( $available_widgets[$widget['id_base']] ) ) { // no dupes

      $available_widgets[$widget['id_base']]['id_base'] = $widget['id_base'];
      $available_widgets[$widget['id_base']]['name'] = $widget['name'];

    }

  }

  $widget_instances = array();

  foreach ( $available_widgets as $widget_data ) {

    // Get all instances for this ID base
    $instances = get_option( 'widget_' . $widget_data['id_base'] );

    // Have instances
    if ( ! empty( $instances ) ) {

      // Loop instances
      foreach ( $instances as $instance_id => $instance_data ) {

        // Key is ID (not _multiwidget)
        if ( is_numeric( $instance_id ) ) {
          $unique_instance_id = $widget_data['id_base'] . '-' . $instance_id;
          $widget_instances[$unique_instance_id] = $instance_data;
        }

      }

    }

  }
  //print_r($widget_instances);
 //ksort($widget_instances);
 // print_r($widget_instances);


  $sidebars_widgets = get_option( 'sidebars_widgets' ); // get sidebars and their unique widgets IDs
  array_multisort($sidebars_widgets);
  //print_r($sidebars_widgets);
  $sidebars_widget_instances = array();
  foreach ( $sidebars_widgets as $sidebar_id => $widget_ids ) {

    // Skip inactive widgets
    if ( 'wp_inactive_widgets' == $sidebar_id ) {
      continue;
    }

    // Skip if no data or not an array (array_version)
    if ( ! is_array( $widget_ids ) || empty( $widget_ids ) ) {
      continue;
    }

    // Loop widget IDs for this sidebar
    foreach ( $widget_ids as $widget_id ) {

      // Is there an instance for this widget ID?
      if ( isset( $widget_instances[$widget_id] ) ) {

        // Add to array
        $sidebars_widget_instances[$sidebar_id][$widget_id] = $widget_instances[$widget_id];

      }

    }

  }
  //ksort($sidebars_widget_instances);
  print_r(json_encode($sidebars_widget_instances));
